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
    @Req() req: Request & { user: unknown },
    @Res() res: Response
  ): void {
    // @ts-ignore
    const { jwt } = req.user;
    if (jwt) {
      res.redirect(`http://localhost:3000/home?jwt=${jwt}`);
    } else {
      res.redirect('http://localhost:3000/unauthorized');
    }
  }
}
