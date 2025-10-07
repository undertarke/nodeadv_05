import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated-mysql/prisma';

@Injectable()
export class PrismaMysqlService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}


// yarn prisma db pull --schema src/prisma/schema.prisma
// yarn prisma generate --schema src/prisma/schema.prisma      