import { Module } from '@nestjs/common';
import { PaymentController } from '../controller/payment/payment.controller';

@Module({
  controllers: [PaymentController],
})
export class PaymentModule {}
