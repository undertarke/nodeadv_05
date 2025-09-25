import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private prismaService: PrismaService) { }

  async getProduct(name) {

    // SELECT * FROM products WHERE product_name LIKE '%name%'
    return await this.prismaService.products.findMany(
      {
        where: {
          product_name: {
            contains: name
          }

        }
      }
    );
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
