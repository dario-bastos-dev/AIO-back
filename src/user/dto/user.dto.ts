import {
	AllUsersResponse,
	User,
	UserBody,
	UserResponse,
} from 'src/user/types/user';

export class CreateUserDto implements UserBody {
	name!: string;
	email!: string;
	password!: string;
}

export class UpadateUserDto implements UserBody {
	name?: string;
	email?: string;
	password?: string;
}
export class ResponseUserDto implements UserResponse {
	status!: string;
	message!: string;
	data!: {
		id?: string;
		name?: string;
		email?: string;
		password?: string;
		delete?: boolean;
		roleId: string | null;
		createdAt?: Date;
		updatedAt?: Date;
	} | null;
	error!: {
		code: number;
		details: string[];
	} | null;
}

export class ResponseAllUsersDto implements AllUsersResponse {
	status!: string;
	message!: string;
	data!: User[] | null;
	error!: {
		code: number;
		details: string[];
	} | null;
}
