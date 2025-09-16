import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express  from 'express'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // cho phép tất cả domain truy cập
  app.use(express.static("."));

  const config = new DocumentBuilder().build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/swagger", app, document);

  await app.listen(8080);

}
bootstrap();


// yarn start => no watching
// yarn start:dev => watching

// đối tượng:app, product, user, order,.....
// 3 phần: 
// - controller: tạo API
// - module: kết nối controller, service, module đối tượng
// - service: tạo chức năng, tính toán,logic ...