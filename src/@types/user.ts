type UserReturn<T> = { data: null; error: string[] } | { data: T; error: null };
export interface UserModel {
	register(): Promise<UserReturn<User>>;
	login(): Promise<UserReturn<User>>;
}
export interface UserBody {
	name?: string;
	email?: string;
	password?: string;
}
export interface User extends UserBody {
	id?: string;
	delete?: boolean;
	roleId: string | null;
	createdAt?: Date;
	updatedAt?: Date;
}
export interface UserError {
	code: number;
	details: string[];
}
export interface UserResponse {
	status: string;
	message: string;
	token?: string;
	data: User | null;
	error: UserError | null;
}
