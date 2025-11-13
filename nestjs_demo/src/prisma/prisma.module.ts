import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// import { PrismaMysqlService } from './prisma-mysql.service';

@Global()
@Module({
    providers:[PrismaService],
    exports:[PrismaService]
})
export class PrismaModule {}
