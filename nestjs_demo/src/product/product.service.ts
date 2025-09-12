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

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll() {
    // return await this.prisma.products.findMany();
    return await this.prismaMySQL.products.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
