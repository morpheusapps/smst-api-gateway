import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Provider } from './types';

@Injectable()
export class AuthService {
  private readonly jwtService: JwtService;

  public constructor(jwtService: JwtService) {
    this.jwtService = jwtService;
  }

  private validateOAuthLogin(thirdPartyId: string, provider: Provider): string {
    try {
      const payload = {
        thirdPartyId,
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

  public validateGoogleOAuthLogin(googleId: string): string {
    return this.validateOAuthLogin(googleId, Provider.GOOGLE);
  }
}
