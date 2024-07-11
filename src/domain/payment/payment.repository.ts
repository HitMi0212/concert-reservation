import { PaymentEntity } from './entity/payment.entity';

export interface PaymentRepository {
  createPayment(reservationId: number): Promise<PaymentEntity>;
}
