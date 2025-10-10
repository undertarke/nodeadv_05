import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
    // imports: [CacheModule.register({
    //     store: redisStore,
    //     host: process.env.HOST_REDIS,
    //     port:  process.env.PORT_REDIS,
    //     auth_pass:process.env.PASS_REDIS,
    //     ttl: 5000, // => to second
    //     isGlobal: true
    // })]
    imports: [
        CacheModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                store: redisStore,
                host: configService.get('HOST_REDIS'),
                port: configService.get('PORT_REDIS'),
                auth_pass: configService.get('PASS_REDIS'),
                ttl: 5000, // => to second
            }),
            inject: [ConfigService],
            isGlobal: true, // Đặt cache có sẵn trên toàn ứng dụng
        })
    ]
})
export class RedisCacheModule { }
