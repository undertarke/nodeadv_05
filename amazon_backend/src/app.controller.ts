import { Body, Controller, Get, HttpException, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import * as nodemailer from 'nodemailer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private prismaService: PrismaService
  ) { }

  @Get("/get-product")
  getProduct(@Query("name") name) {
    return this.appService.getProduct(name);
  }

  @Get("/get-product-by-id/:id")
  getProductById(@Param("id") id) {
    return this.appService.getProductById(id);
  }

  @Post("/order")
  order(@Body() body) {

    // 1 gửi email xác nhận đơn hàng
    let configMail = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sangrom2003@gmail.com",
        pass: "xcxgvnldbeztapwp"
      }
    })

    let infoMail = {
      from: "sangrom2003@gmail.com",
      to: "khaitruong2112@gmail.com", // "khaitruong2112@gmail.com"
      subject: "Đặt hàng qua Amazon",
      html: "<h1> Xác nhận đơn hàng thành công </h1>"
    }
    // send mail verify order => nodemailer , google mail
    configMail.sendMail(infoMail, error => error);

    

    // 2 lưu đặt hàng => create table order
    // this.prismaService.orders.create({ data: {} });

    // 3 lưu giao hàng => create shipping => CSDL mysql

    // 4 gửi email đặt hàng thành công

    infoMail = {
      from: "sangrom2003@gmail.com",
      to: "khaitruong2112@gmail.com", // "khaitruong2112@gmail.com"
      subject: "Đặt hàng qua Amazon",
      html: "<h1> Đặt hàng thành công </h1>"
    }
    // send mail verify order => nodemailer , google mail
    configMail.sendMail(infoMail, error => error);

    return body;

  }
}

// shipping

// MONOLITHIC