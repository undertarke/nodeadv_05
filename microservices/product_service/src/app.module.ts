import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisCacheModule } from './redis_cache/redis_cache.module';

@Module({
  imports: [
    ClientsModule.register([{
      name: "SHIPPING_NAME",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://admin:1234@some-rabbit:5672"],
        queue: "shipping_queue",
        queueOptions: {
          durable: false
        }
      }
    }]),
    PrismaModule,
    RedisCacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
