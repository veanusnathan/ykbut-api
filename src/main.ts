import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      /http:\/\/localhost/,
      'https://ykbut-dashboard.netlify.app/',
      'http://62.72.27.168',
      'http://104.43.65.128',
      'http://62.72.27.168:1212',
      'http://104.43.65.128:8086',
    ],
  });

  app.enableShutdownHooks();

  await app.listen(8086);
}
bootstrap();
