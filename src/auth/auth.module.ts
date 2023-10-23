// auth.module.ts

import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { UserModule } from 'src/user/user.module'; // Import the UserModule
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
  ], // Import the UserModule
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
