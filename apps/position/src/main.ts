import { NestFactory } from '@nestjs/core';
import { PositionModule } from './position.module';

async function bootstrap() {
  const app = await NestFactory.create(PositionModule);
  await app.listen(3000);
}
bootstrap();
