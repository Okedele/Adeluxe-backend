import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  await prismaService.onModuleInit(); // Connect to DB
  app.enableCors({
    origin: 'http://localhost:9000', // frontend URL
    methods: 'GET,POST,PUT,DELETE,PATCH,OPTIONS',
    credentials: true, // if you're using cookies or authorization headers
  });
  app.enableShutdownHooks();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
