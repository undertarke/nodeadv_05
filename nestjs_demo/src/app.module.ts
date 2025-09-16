import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';

// Module gốc
@Module({
  imports: [ProductModule, PrismaModule, JwtModule.register({})],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
