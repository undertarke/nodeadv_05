import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisCacheModule } from './redis_cache/redis_cache.module';
import { ConfigModule } from '@nestjs/config';
import { ElasticModule } from './elastic/elastic.module';

@Module({
  imports: [
    PrismaModule,
    RedisCacheModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ElasticModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
