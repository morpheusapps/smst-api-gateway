import {
  Controller,
  Get,
  UseGuards,
  Res,
  Req,
  UnauthorizedException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  public googleLogin(): void {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  public googleLoginCallback(
    @Req() req: Request & { user: { token?: string } },
    @Res() res: Response
  ): void {
    res.redirect(
      `${process.env.CLIENT_AUTH_REDIRECT_ADDRESS}?token=${req.user.token ||
        ''}`
    );
  }

  @Get('confirm')
  @UseGuards(AuthGuard('jwt'))
  public confirmLogin(
    @Req()
    req: Request & {
      user: {
        thirdPartyCredentials: { thirdPartyId: string; email: string };
        provider: string;
      };
    }
  ): void {
    const { thirdPartyCredentials, provider } = req.user;
    switch (provider) {
      case 'google': {
        req.session.userId = thirdPartyCredentials.thirdPartyId;
        req.session.student = thirdPartyCredentials.email;
        break;
      }
      default:
        throw new UnauthorizedException();
    }
  }
}
