import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {

  const logger = WinstonModule.createLogger({
    defaultMeta: { service: "Product service" },
    transports: [
      new winston.transports.Console(),
      new winston.transports.Http({
        host: "localhost",
        port: 5044,
        level: "error"
      }),
    ],
  });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ["amqp://admin:1234@localhost:5672"],
      queue: "product_queue",
      queueOptions: {
        durable: false
      }
    },
    logger
  });
  await app.listen();
}
bootstrap();


