import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { Response } from 'express'; // Import Express Response

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const port: number = configService.get<number>('PORT') || 4000;

  // Enable Global Prefix
  app.setGlobalPrefix('api');

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://www.my-line.app',
      'https://www.my-line.store',
    ],
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    exposedHeaders: 'Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('MY-LINE Backend API')
    .setDescription('The MY-LINE API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const swaggerJsonPath = './swagger.json';
  writeFileSync(swaggerJsonPath, JSON.stringify(document, null, 2));
  SwaggerModule.setup('/api/docs', app, document);

  // Serve swagger.json
  app.getHttpAdapter().get('/api/docs/swagger.json', (req, res: Response) => {
    res.sendFile(swaggerJsonPath, { root: process.cwd() });
  });

  await app.listen(port);
}

bootstrap();
