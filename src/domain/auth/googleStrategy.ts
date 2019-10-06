import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  // private readonly authService: AuthService;

  public constructor(/*authService: AuthService*/) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile']
    });
    // this.authService = authService;
  }

  public validate(
    request: unknown,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): void {
    try {
      //console.log(profile);
      // console.log(this.authService)
      // const jwt = this.authService.validateGoogleOAuthLogin('wtf');
      const jwt = 'meow';
      const email = 'mee';
      // const email = profile.emails[0].value;

      const user = {
        jwt,
        email
      };

      done(null, user);
    } catch (err) {
      // console.log(err);
      done(err, false);
    }
  }
}
