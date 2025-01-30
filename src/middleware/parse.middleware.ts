import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TokenParserMiddleware implements NestMiddleware {
	use(req: Request, _res: Response, next: NextFunction) {
		const authHeader = req.headers.authorization;
		if (authHeader) {
			const [type, token] = authHeader.split(' ');
			if (type === 'Bearer') {
				req['rawToken'] = token;
			}
		}
		next();
	}
}
