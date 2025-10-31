import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{
      name: "NOTIFY_NAME",
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://admin:1234@localhost:5672"],
        queue: "notify_queue",
        queueOptions: {
          durable: false
        }
      }
    }]),
    PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
