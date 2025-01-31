type UserReturn<T> = { data: null; error: string[] } | { data: T; error: null };
// Interface da resposta da requisição
type Response<T> = {
	status: string;
	message: string;
	data: T | null;
	error: { code: number; details: string[] } | null;
};
// Interfaces dos métodos do repository
export interface UserModel {
	register(body: UserBody): Promise<UserReturn<User>>;
	login(body: UserBody): Promise<UserReturn<User>>;
	findAll(): Promise<UserReturn<User[]>>;
	find(id: String): Promise<UserReturn<User>>;
	update(id: String, body: UserBody): Promise<UserReturn<User>>;
}

// Interfaces dos métodos do service
export interface UserServiceType {
	register(body: UserBody): Promise<UserResponse>;
	login(body: UserBody): Promise<UserResponse>;
	findAll(): Promise<AllUsersResponse>;
	find(id: String): Promise<UserResponse>;
	update(id: String, body: UserBody): Promise<UserResponse>;
}

// Interface do body da requisição
export interface UserBody {
	name?: string;
	email?: string;
	password?: string;
}
// Interface do usuário
export interface User extends UserBody {
	id?: string;
	delete?: boolean;
	roleId: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}

// Interface de update do usuário
export interface UserUpdate extends UserBody {}

// Interface all users
export interface AllUsers {
	name: string;
	id: string;
	email: string;
	password: string;
	delete: boolean;
	createdAt: Date;
	updatedAt: Date;
	roleId: string | null;
}
[];
// Interface da resposta da requisição
export interface UserResponse extends Response<User> {}

export interface AllUsersResponse extends Response<User[]> {}
