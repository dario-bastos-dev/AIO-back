import { Injectable } from '@nestjs/common';
import {
	AllUsersResponse,
	UserBody,
	UserResponse,
	UserServiceType,
} from 'src/user/types/user';

import { SignInResponseToken } from 'src/auth/types/auth';
import UserRepository from './repositories/user.repository';

@Injectable()
export class UserService implements UserServiceType {
	constructor(private readonly userRepository: UserRepository) {}
	// POST - register
	async register(body: UserBody) {
		const { data, error } = await this.userRepository.register(body);

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
		const { data, error } = await this.userRepository.login(body);

		let response: SignInResponseToken;

		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar fazer login',
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
			message: 'Usuário logado com sucesso',
			data: data,
			error: null,
		};

		return response;
	}

	// GET - All users
	async findAll() {
		const { data, error } = await this.userRepository.findAll();

		let response: AllUsersResponse;

		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar buscar os usuários',
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
			message: 'Usuários encontrados com sucesso',
			data: data,
			error: null,
		};

		return response;
	}

	// GET - All users
	async find(id: string) {
		const { data, error } = await this.userRepository.find(id);

		let response: UserResponse;

		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar buscar os usuários',
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
			message: 'Usuário encontrado com sucesso',
			data: data,
			error: null,
		};

		return response;
	}

	// POST - verify
	/*async verify(token: string) {
    let response: UserToken;

    try {
      if (key !== undefined) {
        jwt.verify(token, key);

        response = { message: 'Você está logado', valid: true };

        return response;
      }

      response = { message: 'Erro ao verificar o token', valid: false };

      return response;
    } catch (error) {
      response = { message: 'Você foi deslogado', valid: false };

      return response;
    }
  }*/
}
