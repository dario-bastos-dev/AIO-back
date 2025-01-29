import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserBody, UserResponse } from 'src/@types/user';
import UserRepository from './repositories/user.repository';
const key = process.env.JWT_KEY;

@Injectable()
export class UserService {
	// POST - register
	async register(body: UserBody) {
		const user = new UserRepository(body);

		const { data, error } = await user.register();

		let response: UserResponse;

		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar criar o usuário',
				data: null,
				error: {
					code: 404,
					details: error,
				},
			};
			return response;
		}

		response = {
			status: 'success',
			message: 'Usuário criado com sucesso',
			data: data,
			error: null,
		};

		return response;
	}

	// POST - login
	async login(body: UserBody) {
		const user = new UserRepository(body);

		const { data, error } = await user.login();

		let response: UserResponse;

		if (error !== null || key === undefined) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar fazer login',
				data: null,
				error: {
					code: 404,
					details:
						error !== null ? error : ['Erro ao tentar criar o token de acesso'],
				},
			};
			return response;
		}

		const token = jwt.sign(
			{ id: data.id, name: data.name, email: data.email },
			key,
			{ expiresIn: '7d' },
		);

		response = {
			status: 'success',
			message: 'Usuário logado com sucesso',
			token: token,
			data: data,
			error: null,
		};

		return response;
	}
}
