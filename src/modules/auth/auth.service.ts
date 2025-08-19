import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);

        if(user && await bcrypt.compare(password, user.password)) {
            return user 
        }
        throw new UnauthorizedException('Credentials Invalid');
    }

    async login(user: any) {
        const payload = { sub: user.id, email: user.email};
        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
