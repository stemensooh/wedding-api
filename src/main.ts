import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { AllExceptionsFilter } from './core/filters/all-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule, { cors: false, rawBody: true });
  // const app = await NestFactory.create(AppModule, { cors: false });
  const bodyLimit = 10_485_760; 
  // app.use('json', {bodyLimit})
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: false,
    rawBody: true,
  });

  // const bodyLimit = 10_485_760; // 10MiB
  app.useBodyParser('json', { limit: '10mb' });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  const options = new DocumentBuilder()
    .setTitle('Chat example')
    .setDescription('Chat API description')
    .setVersion('1.0')
    .addTag('productos')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false, //solo para ambientes de produccion va en TRUE
    }),
  );

  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT || '0.0.0.0');
}
bootstrap();
