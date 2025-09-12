import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @HttpCode(202)
  @Get("/demo/:name")
  demo(@Req() req: Request, @Query("id") id, @Query("hoTen") hoTen, @Param("name") name, @Body() body) {

    // let { id, hoTen } = req.query;
    // let {name} = req.params;
    // let { email, phone, address } = req.body;
    let { email, phone, address } = body;

    return { id, hoTen, name, email, phone, address };
  }






  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }

  @Post("/order ")
  order() {
    return "order";
  }
}
