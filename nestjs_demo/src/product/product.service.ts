import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaMysqlService } from 'src/prisma/prisma-mysql.service';

@Injectable()
export class ProductService {

  constructor(
    private prisma: PrismaService,
    private prismaMySQL: PrismaMysqlService
  ) { }

  async create(createProductDto) {
    // let product = {
    //   product_name: "demo",
    //   price: 90,
    //   manufacturer: "cung cap 1",
    //   attributes: { color: "" }
    // }
    await this.prisma.products.create({ data: createProductDto });

    return 'Thêm sản phâm thành công';
  }

  async findAll() {
    // SELECT * FROM product
    return await this.prisma.products.findMany();

    // SELECT * FROM product WHERE product_name = 'a';
    // this.prisma.products.findMany({
    //   where: {
    //     product_name: 'a'
    //   }
    // });

    // let product = {
    //   product_name: "demo",
    //   price: 90,
    //   manufacturer: "cung cap 1",
    //   attributes: { color: "" }
    // }
    // // INSERT INTO VALUES
    // this.prisma.products.create({ data: product });

    // // UPDATE SET WHERE
    // this.prisma.products.update({ data: product, where: { id: 1 } });

    // // DELETE FROM 
    // this.prisma.products.delete({ where });

  }

  findOne(id: number) {
    return this.prisma.products.findUnique({ where: { id: id } });
  }

  async update(id: number, updateProductDto) {
    await this.prisma.products.update({
      data: updateProductDto,
      where: {
        id: id
      }
    })
    return `This action updates a #${id} product`;
  }

  async remove(id) {
    await this.prisma.products.delete({
      where: {
        id: id
      }
    })
    return `This action removes a #${id} product`;
  }

  async order(orders) {
    orders = { ...orders, order_date: new Date() };
    await this.prisma.orders.create({ data: orders });
    return 'đặt hàng thành công';
  }
}
