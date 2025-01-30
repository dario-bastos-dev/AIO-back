import { Module } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PrismaModule } from 'src/prisma/prisma.module';
import UserRepository from './repositories/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
	controllers: [UserController],
	providers: [
		UserService,
		UserRepository,
		{
			provide: 'APP_GUARD',
			useClass: AuthGuard,
		},
	],
	imports: [PrismaModule],
	exports: [UserService],
})
export class UserModule {}
