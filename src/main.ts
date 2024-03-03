import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [/http:\/\/localhost/, 'https://ykbut-dashboard.netlify.app/'],
  });

  app.enableShutdownHooks();

  await app.listen(8086);
}
bootstrap();
