import {
  PaymentDetailEntity,
  PaymentEntity,
} from 'src/infrastructure/payment/payment.entity';
import { EntityManager } from 'typeorm';

export interface PaymentRepository {
  savePayment(
    payment: PaymentEntity,
    _manager: EntityManager,
  ): Promise<PaymentEntity>;

  savePaymentDetail(
    paymentDetail: PaymentDetailEntity,
    _manager: EntityManager,
  ): Promise<PaymentDetailEntity>;
}
