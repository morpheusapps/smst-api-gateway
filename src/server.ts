import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { ExpressAdapter } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { RunServer } from './utils/RunServer';
import { GetUrlByEnv } from './utils/GetUrlByEnv';
import { ApiLogger } from './utils/ApiLogger';
import { Swagger } from './utils/swagger';
import { ApplicationModule } from './app';
import { urls } from './const';

export const runServer = async (port: string | number): Promise<void> => {
  const server = express();
  const app = await NestFactory.create(
    ApplicationModule,
    new ExpressAdapter(server)
  );
  app.use(
    session({
      secret: 'meow',
      resave: false,
      saveUninitialized: true
    })
  );
  app.use((req: Request, res: Response, next: NextFunction): void => {
    const { cookie, ...sessionFields } = req.session;
    Object.keys(sessionFields).forEach((field: string): void => {
      // @ts-ignore
      req[field] = req.session[field];
    });
    next();
  });
  app.enableCors({ origin: 'http://localhost:3000' });
  app.setGlobalPrefix('api');
  Swagger(app);
  ApiLogger(app);
  const getUrlByEnv = GetUrlByEnv(urls);
  return RunServer({
    app,
    port,
    env: process.env.NODE_ENV,
    mapEnvToUrl: getUrlByEnv
  });
};
