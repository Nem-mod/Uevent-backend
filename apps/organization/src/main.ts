import { NestFactory } from '@nestjs/core';
import { OrganizationModule } from './organization.module';

async function bootstrap() {
  const app = await NestFactory.create(OrganizationModule);
  await app.listen(3000);
}
bootstrap();
