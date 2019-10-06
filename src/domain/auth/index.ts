import { Module } from '@nestjs/common';
//import { PassportModule } from '@nestjs/passport';
//import { JwtModule, JwtService } from '@nestjs/jwt';
//import { JwtStrategy } from './jwtStrategy';
import { GoogleStrategy } from './googleStrategy';
import { AuthController } from './auth.controller';
//import { AuthService } from './auth.service';

@Module({
  imports: [
    /*PassportModule.register({
      defaultStrategy: 'jwt'
    })/*,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' }
    })*/
  ],
  controllers: [AuthController],
  providers: [/*AuthService,*/ GoogleStrategy /*JwtStrategy*/]
})
export class AuthModule {}
