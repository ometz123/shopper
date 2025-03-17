/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as process from 'node:process';

dotenv.config();

async function bootstrap() {
  const { BACKEND_PORT, PREFIX } = process.env;
  if (!BACKEND_PORT) {
    throw new Error('BACKEND_PORT is not defined in environment variables!');
  }
  if (!PREFIX) {
    throw new Error('PREFIX is not defined in environment variables!');
  }

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: (origin, callback) => {
        callback(null, true);
      },
      credentials: false,
    },
  });

  app.setGlobalPrefix(PREFIX || 'apii');
  await app.listen(parseInt(BACKEND_PORT) || 3005);
  Logger.log(
    `🚀 Application is running on: http://localhost:${BACKEND_PORT}/${PREFIX}`
  );
}

bootstrap();
