import { User, UserBody, UserError, UserResponse } from 'src/@types/user';

export class CreateUserDto implements UserBody {
	name!: string;
	email!: string;
	password!: string;
}

export class LoginUserDto implements UserBody {
	email!: string;
	password!: string;
}

export class ResponseUserDto implements UserResponse {
	status!: string;
	message!: string;
	data!: User | null;
	error!: UserError | null;
}
