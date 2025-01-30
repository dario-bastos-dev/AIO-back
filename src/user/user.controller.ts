import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import {
	CreateUserDto,
	ResponseAllUsersDto,
	ResponseUserDto,
} from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}
	// POST - register
	@Public()
	@Post('register')
	register(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
		return this.userService.register(createUserDto);
	}

	// GET - All users
	@Get()
	findAll(): Promise<ResponseAllUsersDto> {
		return this.userService.findAll();
	}
	// GET - Especify users
	@Get(':id')
	find(@Param('id') idUser: string): Promise<ResponseUserDto> {
		return this.userService.find(idUser);
	}
}
