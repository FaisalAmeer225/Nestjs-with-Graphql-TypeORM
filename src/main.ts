import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { initAdapters } from './adapters.init';


async function bootstrap():Promise<void>{
  const app = await NestFactory.create(AppModule);

  initAdapters(app);

  await app.listen(4000);

// const redis = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
//   transport: Transport.REDIS,
//   options: {
//     url: 'redis://localhost:6379',
//   },
// });
// await redis.listen();
}
bootstrap();
