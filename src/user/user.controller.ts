import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto, ResponseUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	// POST - register
	@Post('register')
	register(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
		return this.userService.register(createUserDto);
	}

	@Post('login')
	login(@Body() loginUserDto: LoginUserDto): Promise<ResponseUserDto> {
		return this.userService.login(loginUserDto);
	}
}
