import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
const cookiesession = require('cookie-session')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true // Block extra post data
    })
  )

  // Sweger:
  const config = new DocumentBuilder()
    .setTitle('My NestJS API') // You can name this anything
    .setDescription('Swagger API documentation')
    .setVersion('1.0')
    .addBearerAuth() // Optional: for JWT token support
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger will be available at /api

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
