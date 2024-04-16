import { NestFactory } from '@nestjs/core';
import { AnalyticModule } from './analytic.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalyticModule);
  await app.listen(3000);
}
bootstrap();
