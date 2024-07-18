import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PaymentController } from '../../presentation/controller/payment/payment.controller';
import { PaymentEntity } from './entity/payment.entity';

const paymentEntity = new PaymentEntity({
  id: 1,
  user_id: '12',
  reservation_id: 1,
  created_at: new Date('2024-07-11 18:00:00'),
});

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        PaymentService,
        {
          provide: PaymentService,
          useValue: {
            createPayment: jest.fn().mockResolvedValue(paymentEntity),
          },
        },
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
  });

  it('콘서트 좌석 결제', async () => {
    // Given
    const reservationId = 1;

    // When
    const result = await service.createPayment(reservationId);

    // Then
    expect(result).toStrictEqual(paymentEntity);
  });
});
