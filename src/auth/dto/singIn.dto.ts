import { ResponseUserDto } from 'src/user/dto/user.dto';
import { SignIn } from '../types/auth';

export class SingInUserDto implements SignIn {
	email!: string;
	password!: string;
}

export class SingInResponseDto extends ResponseUserDto {
	token?: string;
}
