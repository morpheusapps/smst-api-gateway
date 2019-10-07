import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
      passReqToCallback: true,
      scope: ['profile', 'email']
    });
    this.authService = authService;
  }

  public validate(
    request: unknown,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback
  ): void {
    try {
      const gmail = profile.emails[0].value;
      const token = this.authService.validateGoogleOAuthLogin({
        googleId: profile.id,
        gmail
      });

      const user = {
        token
      };

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
}
