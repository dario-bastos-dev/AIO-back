import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, UserBody, UserModel } from 'src/user/types/user';
import { ZodError } from 'zod';
import PrismaErrorCode from '../../@types/prisma';
import { CreateUserSchema, LoginUserSchema } from '../schemas/user.schema';

@Injectable()
export default class UserRepository implements UserModel {
	private _user: User | null = null;
	private _error: string[] = [];

	constructor(private readonly _prisma: PrismaService) {}
	// Funções para manipular o banco de dados
	// POST - registro
	public async register(body: UserBody) {
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
			console.log(error);

			if (error instanceof ZodError) this._error.push(error.errors[0].message);

			if (error instanceof Prisma.PrismaClientKnownRequestError)
				switch (error.code) {
					case PrismaErrorCode.UNIQUE_CONSTRAINT:
						this._error.push('Usuário já cadastrado');
						break;
					case PrismaErrorCode.RECORD_NOT_FOUND:
						this._error.push('Usuário não encontrado');
						break;
					default:
						this._error.push('Ocorreu um erro ao tentar criar o usuário');
				}
			return { data: null, error: this._error };
		}
	}

	// POST - login
	public async login(body: UserBody) {
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
			console.log(error);

			if (error instanceof ZodError) this._error.push(error.errors[0].message);

			if (error instanceof Prisma.PrismaClientKnownRequestError)
				switch (error.code) {
					case PrismaErrorCode.INVALID_DATA_TYPE:
						this._error.push('Tipo de dados inválido');
						break;
					case PrismaErrorCode.RECORD_NOT_FOUND:
						this._error.push('Usuário não foi encontrado');
						break;
					case PrismaErrorCode.OPERATION_FAILED:
						this._error.push('Erro ao tentar fazer login');
						break;
					default:
						this._error.push('Ocorreu um erro ao tentar fazer login');
				}
			return { data: null, error: this._error };
		}
	}

	// GET - Find all users
	public async findAll() {
		try {
			const users = await this._prisma.user.findMany({
				orderBy: {
					createdAt: 'asc',
				},
			});

			return { data: users, error: null };
		} catch (error) {
			console.log(error);

			if (error instanceof Prisma.PrismaClientKnownRequestError)
				switch (error.code) {
					case PrismaErrorCode.RECORD_NOT_FOUND:
						this._error.push('Nenhum usuário encontrado');
						break;
					case PrismaErrorCode.OPERATION_FAILED:
						this._error.push('Erro ao tentar buscar usuários');
						break;
					default:
						this._error.push('Ocorreu um erro ao tentar buscar usuários');
				}
			return { data: null, error: this._error };
		}
	}
	// GET - Find all users
	public async find(id: string) {
		try {
			this._user = await this._prisma.user.findUnique({
				where: { id },
			});

			if (this._user == null) {
				this._error.push('Nenhum usuário encontrado');
				return { data: null, error: this._error };
			}

			return { data: this._user, error: null };
		} catch (error) {
			console.log(error);

			if (error instanceof Prisma.PrismaClientKnownRequestError)
				switch (error.code) {
					case PrismaErrorCode.RECORD_NOT_FOUND:
						this._error.push('Nenhum usuário encontrado');
						break;
					case PrismaErrorCode.OPERATION_FAILED:
						this._error.push('Erro ao tentar buscar usuários');
						break;
					default:
						this._error.push('Ocorreu um erro ao tentar buscar usuários');
				}
			return { data: null, error: this._error };
		}
	}
}
