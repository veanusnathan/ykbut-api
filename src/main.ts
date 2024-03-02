import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [/http:\/\/localhost/],
  });

  app.enableShutdownHooks();

  await app.listen(8086);
}
bootstrap();
