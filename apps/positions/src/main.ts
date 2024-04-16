import { NestFactory } from '@nestjs/core';
import { PositionsModule } from './positions.module';

async function bootstrap() {
  const app = await NestFactory.create(PositionsModule);
  await app.listen(3000);
}
bootstrap();
