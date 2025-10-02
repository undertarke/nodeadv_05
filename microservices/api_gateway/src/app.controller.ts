import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, of, retry, timeout } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject("PRODUCT_NAME") private productService: ClientProxy,
    @Inject("NOTIFY_NAME") private notifyService: ClientProxy,

  ) { }

  @Get("/get-demo")
  async getDemo() {

    let data = await lastValueFrom(this.productService.send("demo_key", "đây là param gửi đi"));

    return data;

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
}
