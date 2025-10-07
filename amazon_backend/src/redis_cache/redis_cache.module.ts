import { CacheModule } from '@nestjs/cache-manager';
import { Global, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
    imports: [CacheModule.register({
        store: redisStore,
        host: process.env.HOST_REDIS,
        port:  process.env.PORT_REDIS,
        auth_pass:process.env.PASS_REDIS,
        ttl: 5000, // => to second
        isGlobal: true
    })]
})
export class RedisCacheModule { }
