import { NestFactory } from '@nestjs/core';
import { OrganizationsModule } from './organizations.module';

async function bootstrap() {
  const app = await NestFactory.create(OrganizationsModule);
  await app.listen(3000);
}
bootstrap();
