import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  public constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile']
    });
  }

  public validate(
    request: unknown,
    accessToken: string,
    refreshToken: string,
    profile: unknown,
    done: Function
  ): void {
    try {
      const jwt = 'placeholderJWT';
      const user = {
        jwt
      };

      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }
}
