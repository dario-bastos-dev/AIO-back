import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserBody } from 'src/user/types/user';
import { UserService } from 'src/user/user.service';
import { SignInResponse } from './types/auth';

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
	) {}

	async signIn(body: UserBody) {
		const response = await this.userService.login(body);

		let payload: SignInResponse;

		if (response.error !== null) {
			response.error.details.push(new UnauthorizedException().message);
		}

		if (response.data !== null) {
			payload = {
				id: response.data.id,
				name: response.data.name,
				email: response.data.email,
			};

			response.token = this.jwtService.sign(payload);
		}

		return response;
	}
}
