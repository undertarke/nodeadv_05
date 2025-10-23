import { Body, Controller, Get, HttpException, Inject, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import * as nodemailer from 'nodemailer';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private prismaService: PrismaService,

    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private elasticService: ElasticsearchService
  ) { }

  @Get("/get-elastic")
  async getElastic() {

    // GET /demo_index/_search

    let data = await this.elasticService.search({
      index: "demo_index",
      query: {
        range: {
          "price": {
            lt: 30
          }
        }
      },
      sort: [
        {
          "price": "asc"
        }
      ]
    })

    return data;
  }


  @Post("/action-elastic")
  async actionElastic() {

    // GET /demo_index/_search

    // await this.elasticService.delete({
    //   index: "demo_index",
    //   id: "191",
    //   refresh: true
    // })

    // await this.elasticService.create({
    //   index: "demo_index",
    //   id: "191",
    //   document: {
    //     "name": "macbook apple m5",
    //     "category": "Computer",
    //     "price": 5.3,
    //     "in_stock": true,
    //     "quantity": 50,
    //     "create_at": "2025-10-16"
    //   },
    //   refresh: true

    // })

    // await this.elasticService.index({
    //   index: "demo_index",
    //   document: {
    //     "name": "macbook apple m6",
    //     "category": "Computer",
    //     "price": 5.3,
    //     "in_stock": true,
    //     "quantity": 50,
    //     "create_at": "2025-10-16"
    //   },
    //   refresh: true
    // })

    await this.elasticService.update({
      index: "demo_index",
      id: "191",
      doc: {
        "name": "iphone 17 promax",
        "category": "Computer",
        "price": 5.3,
        "in_stock": true,
        "quantity": 50,
        "create_at": "2025-10-16"
      },
      refresh: true
    })


    let data = await this.elasticService.search({
      index: "demo_index",

    })

    return data;
  }



  @Get("/get-cache")
  async getCache() {
    let demo = await this.cacheManager.get("DEMO");
    console.log(typeof demo);
    let demo2 = await this.cacheManager.get("DEMO2");
    return { demo, demo2 };
  }

  @Get("/save-cache")
  async saveCache() {
    await this.cacheManager.set("DEMO", "hello world !");
    await this.cacheManager.set("DEMO2", "hello world !");
  }

  @Get("/delete-cache")
  async deleteCache() {
    await this.cacheManager.del("DEMO");
  }
  @Get("/reset-cache")
  async resetCache() {
    await this.cacheManager.reset();
  }


  @Get("/get-product")
  getProduct(@Query("name") name) {

    return this.appService.getProduct();
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