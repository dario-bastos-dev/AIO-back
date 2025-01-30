import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TokenParserMiddleware } from './middleware/parse.middleware';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [UserModule, RoleModule, AuthModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(TokenParserMiddleware).forRoutes('*');
	}
}
