import { Injectable } from '@nestjs/common';
import {
  PaymentDetailEntity,
  PaymentEntity,
} from 'src/infrastructure/payment/payment.entity';
import { EntityManager } from 'typeorm';
import { PaymentRepository } from './payment.repository';

@Injectable()
export class PaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async savePayment(
    payment: PaymentEntity,
    _manager: EntityManager,
  ): Promise<PaymentEntity> {
    return await this.paymentRepository.savePayment(payment, _manager);
  }

  async savePaymentDetail(
    paymentDetail: PaymentDetailEntity,
    _manager: EntityManager,
  ): Promise<PaymentDetailEntity> {
    return await this.paymentRepository.savePaymentDetail(
      paymentDetail,
      _manager,
    );
  }
}
