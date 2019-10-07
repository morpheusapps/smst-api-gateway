import { Controller, Get, UseGuards, Res, Req } from '@nestjs/common';
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
    @Req() req: Request & { user: { jwt?: string; email?: string } },
    @Res() res: Response
  ): void {
    const { jwt = '', email = '' } = req.user;
    res.redirect(`http://localhost:3000/home?jwt=${jwt}&email=${email}`);
  }

  @Get('confirm')
  @UseGuards(AuthGuard('jwt'))
  public confirmLogin(
    @Req() req: Request & { student?: string },
    @Res() res: Response
  ): void {
    const { email } = req.query;
    req.session.student = email;
    res.sendStatus(200);
  }
}
