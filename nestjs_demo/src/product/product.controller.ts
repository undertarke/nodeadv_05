import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req, Query, UseInterceptors, UploadedFile, UploadedFiles, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Request } from 'express';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  fileUpload: any;
}

class FilesUploadDto {
  @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' } })
  files: any[];
}

class DemoType {

  @ApiProperty()
  email: string

  @ApiProperty()
  phone: string

  @ApiProperty()
  address: string

}

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @HttpCode(202)
  @Get("/demo/:name")
  demo(@Req() req: Request, @Query("id") id: string, @Query("hoTen") hoTen: string, @Param("name") name: string, @Body() body: DemoType) {

    // let { id, hoTen } = req.query;
    // let {name} = req.params;
    // let { email, phone, address } = req.body;
    let { email, phone, address } = body;

    return { id, hoTen, name, email, phone, address };
  }






  @Post()
  create(@Body() createProductDto) {
    return this.productService.create(createProductDto);
  }

  // @UseGuards(AuthGuard("jwt"))
  @Get()
  findAll() {

    return this.productService.findAll();
  }

  
  @Get(':id')
  findOne(@Param('id') id) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id, @Body() updateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return this.productService.remove(+id);
  }

  @Post("/order")
  order(@Body() orders) {
    return this.productService.order(orders);
  }



  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor("fileUpload", {
    storage: diskStorage({
      destination: process.cwd() + "/public/imgs",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/upload")
  upload(@UploadedFile() file) {
    return file;
  }


  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FilesUploadDto,
  })
  @UseInterceptors(FilesInterceptor("fileUpload", 5, {
    storage: diskStorage({
      destination: "",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/upload-multiple")
  uploadMulti(@UploadedFiles() files) {
    return files
  }

}
