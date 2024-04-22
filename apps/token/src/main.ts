import { NestFactory } from '@nestjs/core';
import { TokenModule } from './token.module';

async function bootstrap() {
  // TODO: Connect Redis, create table for unexpired tokens. Create functions for creating, deleting tokens and finding tokens. Delete expired tokens
  const app = await NestFactory.create(TokenModule);
  await app.listen(3000);
}
bootstrap();
