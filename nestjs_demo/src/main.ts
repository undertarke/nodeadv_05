import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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