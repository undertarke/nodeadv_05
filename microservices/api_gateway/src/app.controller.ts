import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject("PRODUCT_NAME") private productService: ClientProxy,
    @Inject("NOTIFY_NAME") private notifyService: ClientProxy,

  ) { }

  @Get("/get-hello")
  async getHello() {

    return "Hello world";

  }

  @Get("/get-demo")
  async getDemo() {

    lastValueFrom(this.productService.emit("demo_key", "đây là param gửi đi"));

    lastValueFrom(this.notifyService.emit("demo_key", "đây là param gửi đi"));

    return "data";

  }

  @Post("/order")
  async order(@Body() body) {

    // body: customer_id, product_id, quantity , email, first_name, last_name, phone, address

    // 1 gửi email xác nhận đơn hàng
    this.notifyService.emit("xac_nhan_don_hang", body);

    // 2 lưu đặt hàng => create table order
    let data = await lastValueFrom(this.productService.send("dat_hang", body).pipe(
      timeout(1000), // 2s => thời gian gọi lại 1 lượt
      retry(3), // số lượt gọi lại
      catchError(err => {
        return of({
          error: 'Service is currently unavailable. Please try again later.'
        })
      })

    ));

    return data;

  }


  @Get("/demo-cache/:id")
  async demoCache(@Param("id") id) {
    if (id == 0) {
      this.productService.emit("save_cache", "");
    }
    if (id == 1) {
      return await this.productService.send("get_cache", "");

    }
    if (id == 2) {
      this.productService.emit("delete_cache", "");

    }
  }
}
