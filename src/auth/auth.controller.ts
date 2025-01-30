import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { AuthService } from './auth.service';
import { SingInResponseDto, SingInUserDto } from './dto/singIn.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Public()
	@Post('login')
	signIn(@Body() signInDto: SingInUserDto): Promise<SingInResponseDto> {
		return this.authService.signIn(signInDto);
	}
}
