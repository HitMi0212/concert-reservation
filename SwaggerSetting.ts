import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerSetting = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Concert Reservation')
    .setDescription('콘서트 좌석 예약 API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);
};
