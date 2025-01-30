import { Test, TestingModule } from '@nestjs/testing';
import { User, UserBody } from 'src/@types/user';
import UserRepository from '../repositories/user.repository';
import { UserService } from '../user.service';

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				UserService,
				{
					provide: UserRepository,
					useValue: {
						register: jest.fn(), // Configura o mock para simular um erro
						login: jest.fn(),
					},
				},
			],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	// Teste para o cenário de sucesso
	it('Register - successfully', async () => {
		// Arrange
		const userBody: UserBody = {
			name: 'John Doe',
			email: 'john5@example.com',
			password: 'password123',
		};

		// Act
		const result = await service.register(userBody);

		// Assert
		expect(result).toEqual(
			expect.objectContaining({
				status: 'success',
				message: 'Usuário criado com sucesso',
				data: expect.objectContaining({
					id: expect.any(String),
					name: 'John Doe',
					email: 'john5@example.com',
					password: expect.any(String),
					delete: false,
					roleId: null,
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
				}),
				error: null,
			}),
		);
	});

	// Teste para o cenário de erro
	it('Register - incorrectly', async () => {
		// Arrange
		const userBody: UserBody = {
			name: 'John Doe',
			email: 'john5@example.com',
			password: 'pass',
		};

		// Act
		const result = await service.register(userBody);

		// Assert
		expect(result).toEqual(
			expect.objectContaining({
				status: 'error',
				message: 'Ocorreu um erro ao tentar criar o usuário',
				data: null,
				error: expect.objectContaining({
					code: 404,
					details: ['Invalid password'],
				}),
			}),
		);
	});

	// Teste para o cenário de sucesso
	it('Login - successfully', async () => {
		// Arrange
		const userBody: UserBody = {
			email: 'john5@example.com',
			password: 'password123',
		};

		// Act
		const result = await service.login(userBody);

		// Assert
		expect(result).toEqual(
			expect.objectContaining({
				status: 'success',
				message: 'Usuário logado com sucesso',
				token: expect.any(String),
				data: expect.objectContaining({
					id: expect.any(String),
					name: 'John Doe',
					email: 'john5@example.com',
					password: expect.any(String),
					delete: false,
					roleId: null,
					createdAt: expect.any(Date),
					updatedAt: expect.any(Date),
				}),
				error: null,
			}),
		);
	});

	it('Login - incorrectly', async () => {
		// Arrange
		const userBody: UserBody = {
			email: 'john5@example.com',
			password: 'passqwewqeq',
		};

		// Act
		const result = await service.login(userBody);

		// Assert
		expect(result).toEqual(
			expect.objectContaining({
				status: 'error',
				message: 'Ocorreu um erro ao tentar fazer login',
				data: null,
				error: expect.objectContaining({
					code: 404,
					details: ['Senha incorreta'],
				}),
			}),
		);
	});
});
