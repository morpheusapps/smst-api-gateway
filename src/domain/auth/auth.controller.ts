import {
  Controller,
  Get,
  UseGuards,
  Res,
  Req,
  UnauthorizedException,
  Post,
  InternalServerErrorException,
  HttpCode
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response, Request } from 'express';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ title: '!NOT AVAILABLE WITH SWAGGER!', deprecated: true })
  public googleLogin(): void {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  @ApiOperation({ title: '!NOT AVAILABLE WITH SWAGGER!', deprecated: true })
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
  @ApiBearerAuth()
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
        req.session.studentEmail = thirdPartyCredentials.email;
        break;
      }
      default:
        throw new UnauthorizedException();
    }
  }

  @Get('session')
  public getSession(
    @Req()
    req: Request
  ): { profile?: string } {
    return { profile: req.session.studentEmail };
  }

  @Post('session/destroy')
  @HttpCode(204)
  public destroySession(
    @Req()
    req: Request
  ): void {
    req.session.destroy((error: unknown): void => {
      if (error) {
        throw new InternalServerErrorException();
      }
    });
  }
}
