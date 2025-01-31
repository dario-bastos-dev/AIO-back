import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, UserBody, UserModel, UserUpdate } from 'src/user/types/user';
import { ZodError } from 'zod';
import {
	CreateUserSchema,
	LoginUserSchema,
	UpdateUserSchema,
	UserIdSchema,
} from '../schemas/user.schema';

@Injectable()
export default class UserRepository implements UserModel {
	private _user: User | null = null;
	private _error: string[] = [];

	constructor(private readonly _prisma: PrismaService) {}

	// emmiter error
	private emmiterError(error: unknown): { data: null; error: string[] } {
		if (error instanceof ZodError)
			error.errors.map((err) =>
				this._error.push(`${err.path}: ${err.message}`),
			);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			switch (error.code) {
				case 'P2025':
					this._error.push('Usuário não encontrado');
					break;
				default:
					this._error.push(error.message);
					break;
			}
		}

		return { data: null, error: this._error };
	}

	// Data cleaning
	private dataCleaning() {
		this._user = null;
		this._error = [];
	}

	// Funções para manipular o banco de dados
	// POST - registro
	public async register(body: UserBody) {
		// Data cleaning
		this.dataCleaning();
		// Execeute code
		if (body == null) {
			this._error.push('No data provided');
			return { data: null, error: this._error };
		}
		try {
			const { name, email, password } = CreateUserSchema.parse(body);
			const salt = bcrypt.genSaltSync(10);
			const hash = bcrypt.hashSync(password, salt);
			this._user = await this._prisma.user.create({
				data: {
					name,
					email,
					password: hash,
				},
			});
			return { data: this._user, error: null };
		} catch (error) {
			return this.emmiterError(error);
		}
	}

	// POST - login
	public async login(body: UserBody) {
		// Data cleaning
		this.dataCleaning();
		// Execeute code
		if (body == null) {
			this._error.push('No data provided');
			return { data: null, error: this._error };
		}
		try {
			const { email, password } = LoginUserSchema.parse(body);
			this._user = await this._prisma.user.findFirst({
				where: {
					email,
				},
			});
			if (this._user == null) {
				this._error.push('Usuário não encontrado');
				return { data: null, error: this._error };
			}
			const { password: userPassword } = LoginUserSchema.parse(this._user);
			if (bcrypt.compareSync(password, userPassword) == false) {
				this._error.push('Senha incorreta');
				return { data: null, error: this._error };
			}
			return { data: this._user, error: null };
		} catch (error) {
			return this.emmiterError(error);
		}
	}

	// GET - Find all users
	public async findAll() {
		// Data cleaning
		this.dataCleaning();
		// Execeute code
		try {
			const users = await this._prisma.user.findMany({
				orderBy: {
					createdAt: 'asc',
				},
				where: { delete: false },
			});
			return { data: users, error: null };
		} catch (error) {
			if (error instanceof ZodError)
				error.errors.map((err) =>
					this._error.push(`${err.path}: ${err.message}`),
				);
			if (error instanceof Prisma.PrismaClientKnownRequestError)
				this._error.push(error.message);
			return { data: null, error: this._error };
		}
	}
	// GET - Find especify user
	public async find(id: string) {
		// Data cleaning
		this.dataCleaning();
		// Execeute code
		try {
			this._user = await this._prisma.user.findUnique({
				where: { id },
			});
			if (this._user == null) {
				this._error.push('Nenhum usuário encontrado');
				return { data: null, error: this._error };
			}
			if (this._user.delete == true) {
				this._error.push('Usuário deletado');
				return { data: null, error: this._error };
			}
			return { data: this._user, error: null };
		} catch (error) {
			return this.emmiterError(error);
		}
	}

	// PUT - Update user
	public async update(idUser: string, bodyUser: UserUpdate) {
		// Data cleaning
		this.dataCleaning();
		// Execeute code
		if (bodyUser == null) {
			this._error.push('No data provided');
			return { data: null, error: this._error };
		}
		try {
			const id = UserIdSchema.parse(idUser);
			const body = UpdateUserSchema.parse(bodyUser);
			if (body.password !== undefined) {
				const { password } = body;
				const salt = bcrypt.genSaltSync(10);
				const hash = bcrypt.hashSync(password, salt);
				body.password = hash;
			}
			this._user = await this._prisma.user.update({
				where: { id, delete: false },
				data: body,
			});
			if (this._user == null) {
				this._error.push('Usuário não encontrado');
				return { data: null, error: this._error };
			}
			return { data: this._user, error: null };
		} catch (error) {
			return this.emmiterError(error);
		}
	}

	// DELETE - Delete user
	public async delete(idUser: string) {
		// Data cleaning
		this.dataCleaning();
		// Execeute code
		try {
			const id = UserIdSchema.parse(idUser);
			this._user = await this._prisma.user.update({
				where: { id },
				data: { delete: true },
			});
			if (this._user.delete == true) {
				this._error.push('Usuário não encontrado');
				return { data: null, error: this._error };
			}
			return { data: this._user, error: null };
		} catch (error) {
			return this.emmiterError(error);
		}
	}
}
