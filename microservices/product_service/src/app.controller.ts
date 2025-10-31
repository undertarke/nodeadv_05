import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy, EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { PrismaService } from './prisma/prisma.service';
import { lastValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private prismaService: PrismaService,
    @Inject("SHIPPING_NAME") private shippingService: ClientProxy,

    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) { }


  @MessagePattern("demo_key")
  async getDemo(@Payload() data) {
    await lastValueFrom(this.shippingService.send("demo_key", "đây là param gửi đi"));

    throw new Error("bugg product");
    console.log("product", data)
    return `Get list products !!! => ${data}`;
  }

  @MessagePattern("dat_hang")
  async order(@Payload() data) {
    // console.log("goi tới product_serivce để đặt hàng", data);

    let { customer_id, product_id, quantity } = data

    let resOrder = await this.prismaService.orders.create({
      data: {
        customer_id,
        product_id,
        quantity,
        order_date: new Date()
      }
    })

    let dataShipping = { ...data, order_id: resOrder.order_id }

    let resShipping = await lastValueFrom(this.shippingService.send("luu_ship", dataShipping));

    return { resOrder, resShipping };
  }




  @EventPattern("save_cache")
  async saveCache() {
    await this.cacheManager.set("DEMO_CACHE", "Hello demo 1");
    await this.cacheManager.set("DEMO_CACHE2", "Hello demo 2");
  }

  @MessagePattern("get_cache")
  async getCache() {
    let data = await this.cacheManager.get("DEMO_CACHE");
    let data2 = await this.cacheManager.get("DEMO_CACHE2");
    return { data, data2 }
  }

  @EventPattern("delete_cache")
  async deleteCache() {
    await this.cacheManager.del("DEMO_CACHE");
  }

}
