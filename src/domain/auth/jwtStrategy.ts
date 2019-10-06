import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  public constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('jwt'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  public validate(payload: unknown, done: Function): unknown {
    try {
      return done(null, payload);
    } catch (error) {
      throw new UnauthorizedException('unauthorized', error.message);
    }
  }
}
