import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaMysqlService } from './prisma/prisma-mysql.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService,
    private prismaMysqlService: PrismaMysqlService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }




  async getProduct() {

    let dataCache = await this.cacheManager.get("SANPHAM");
    console.log(dataCache)
    if (dataCache != "" && dataCache != undefined) {
      return dataCache;
    }
    
    let data = await this.prismaMysqlService.$queryRaw`
        SELECT *
        FROM sanpham
        LIMIT 50000;
    `;

    await this.cacheManager.set("SANPHAM", data);
    return data;
  }

  async getProductById(id) {

    // SELECT * FROM products WHERE product_name LIKE '%name%'
    return await this.prismaService.products.findUnique(
      {
        where: {
          id: +id
        }
      }
    );
  }
}
