import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './middleware/logging.middleware';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(json());
  app.use(logger);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
