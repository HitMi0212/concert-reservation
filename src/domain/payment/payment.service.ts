import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment.repository';
import { PaymentEntity } from './entity/payment.entity';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async createPayment(reservationId: number) {
    const payment: PaymentEntity =
      await this.paymentRepository.createPayment(reservationId);

    return payment;
  }
}
