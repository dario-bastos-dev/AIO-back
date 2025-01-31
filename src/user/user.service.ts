import { Injectable } from '@nestjs/common';
import {
	AllUsersResponse,
	UserBody,
	UserResponse,
	UserServiceType,
	UserUpdate,
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

	// PUT - Update user
	async update(id: string, body: UserUpdate) {
		const { data, error } = await this.userRepository.update(id, body);
		let response: UserResponse;
		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar atualizar o usuário',
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
			message: 'Usuário atualizado com sucesso',
			data: data,
			error: null,
		};
		return response;
	}

	// DELETE - Delete user
	async delete(id: string) {
		const { data, error } = await this.userRepository.delete(id);
		let response: UserResponse;
		if (error !== null) {
			response = {
				status: 'error',
				message: 'Ocorreu um erro ao tentar deletar o usuário',
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
			message: 'Usuário deletado com sucesso',
			data: data,
			error: null,
		};
		return response;
	}
}
