import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(
		private jwtService: JwtService,
		private reflector: Reflector,
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		// Verify public routes
		const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
			context.getHandler(),
			context.getClass(),
		]);
		if (isPublic) {
			return true;
		}

		const erroResponse = {
			status: 'error',
			message: 'Ocorreu um erro ao autenticar o usuário',
			data: null,
			error: {
				code: new UnauthorizedException().getStatus(),
				details: new UnauthorizedException().message,
			},
		};

		// Verify private routes
		const request = context.switchToHttp().getRequest();
		const token = request.rawToken;
		if (token == undefined) {
			throw new UnauthorizedException(erroResponse);
		}
		try {
			const payload = await this.jwtService.verifyAsync(token, {
				secret: jwtConstants.secret,
			});
			request['user'] = payload;
		} catch {
			throw new UnauthorizedException(erroResponse);
		}
		return true;
	}
}
