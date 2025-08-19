import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        return this.authService.login(user);
    }

    @Post('signup')
    singup(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto.email, createUserDto.password);
    }

    @Get('profile')
    getProfile(@Param('email') email: string) {
        return this.usersService.findByEmail(email);
      
    }

}
