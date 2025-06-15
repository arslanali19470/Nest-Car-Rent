import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookiesession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true // Block extra post data
    })
  )
  app.use(cookiesession({
    keys: ['asdfasdf']
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
