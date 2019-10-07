import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Provider } from './types';

@Injectable()
export class AuthService {
  private readonly jwtService: JwtService;

  public constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
  }

  private validateOAuthLogin(
    thirdPartyCredentials: { thirdPartyId: string; email: string },
    provider: Provider
  ): string {
    try {
      const payload = {
        thirdPartyCredentials,
        provider
      };

      const jwt: string = this.jwtService.sign(payload);
      return jwt;
    } catch (error) {
      throw new InternalServerErrorException(
        'validateOAuthLogin',
        error.message
      );
    }
  }

  public validateGoogleOAuthLogin({
    googleId,
    gmail
  }: {
    googleId: string;
    gmail: string;
  }): string {
    const googleCredentials = { thirdPartyId: googleId, email: gmail };
    return this.validateOAuthLogin(googleCredentials, Provider.GOOGLE);
  }
}
