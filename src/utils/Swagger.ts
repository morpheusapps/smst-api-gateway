import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const Swagger = (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .setTitle('API-GATEWAY')
    .setDescription('Api-Gateway API description')
    .setVersion('1.0.0')
    .setBasePath('/api')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
};
