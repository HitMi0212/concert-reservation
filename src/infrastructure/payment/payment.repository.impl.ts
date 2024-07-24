import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository } from 'src/domain/payment/payment.repository';
import { EntityManager, Repository } from 'typeorm';
import { PaymentDetailEntity, PaymentEntity } from './payment.entity';

@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async savePayment(
    payment: PaymentEntity,
    _manager: EntityManager,
  ): Promise<PaymentEntity> {
    const manager = _manager ?? this.paymentRepository.manager;

    return await manager.save(payment);
  }

  async savePaymentDetail(
    paymentDetail: PaymentDetailEntity,
    _manager: EntityManager,
  ): Promise<PaymentDetailEntity> {
    const manager = _manager ?? this.paymentRepository.manager;

    return await manager.save(paymentDetail);
  }
}
