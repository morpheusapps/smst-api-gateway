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
    @Req() req: Request & { user: { jwt: string; email: string } },
    @Res() res: Response
  ): void {
    //console.log(req.user);
    res.redirect('http://localhost:3000');
    //res.sendStatus(200);
    /*if (jwt) {
      res.redirect(`http://localhost:3000/home?jwt=${jwt}`);
    } else {
      res.redirect('http://localhost:3000/unauthorized');
    }*/
  }

  /*@Get('protected')
  @UseGuards(AuthGuard('jwt'))
  public protectedResource(
    @Req() req: Request & { user: { jwt: string; email: string } }
  ): { jwt: string; email: string } {
    console.log('JWT is working!');
    return req.user;
  }*/
}
