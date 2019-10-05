import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  public constructor() {
    super({
      clientID:
        '1077995647901-dgv1orqvenl28vv6mdhesvhbvej05v1f.apps.googleusercontent.com',
      clientSecret: 'Z2WD6tfaNjaJm6BqHiRXxIl5',
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
