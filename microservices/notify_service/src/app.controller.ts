import { Controller, Get, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import * as nodemailer from 'nodemailer';
import { EventPattern, Payload } from '@nestjs/microservices';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern("xac_nhan_don_hang")
  xacNhanDonHang(@Payload() data) {
    let { email, product_id } = data;

    // console.log("gọi tới notify service",data);
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
      to: email, // "khaitruong2112@gmail.com"
      subject: " Xác nhận đơn hàng Amazon",
      html: `<h1> Xác nhận đơn hàng mã sản phẩm ${product_id} thành công </h1>`
    }

    // send mail verify order => nodemailer , google mail
    configMail.sendMail(infoMail, error => error);

  }



  @EventPattern("dat_hang_thanh_cong")
  datHangThanhCong(@Payload() data) {
    let { email, order_id } = data;

    // console.log("gọi tới notify service",data);
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
      to: email, // "khaitruong2112@gmail.com"
      subject: "Đặt hàng thành công tại Amazon",
      html: `<h1> Đặt hàng thành công mã đơn hàng ${order_id} thành công </h1>`
    }

    // send mail verify order => nodemailer , google mail
    configMail.sendMail(infoMail, error => error);

  }



}
