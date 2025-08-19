import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'jwt-secret', 
      signOptions: { expiresIn: '15m' }, 
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
