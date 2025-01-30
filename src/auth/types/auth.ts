import { UserResponse } from 'src/user/types/user';

export interface SignIn {
	email?: string;
	password?: string;
}

export interface SignInResponse extends SignIn {
	id?: string;
	name?: string;
}

export interface SignInResponseToken extends UserResponse {
	token?: string;
}
