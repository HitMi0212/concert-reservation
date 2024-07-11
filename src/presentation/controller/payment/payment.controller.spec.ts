import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { PaymentResponseDto } from '../../dto/payment/response/payment.response.dto';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentController,
          useValue: {
            concertPayment: jest.fn().mockResolvedValue(
              new PaymentResponseDto({
                id: 1,
                userId: '12',
                reservationId: 1,
                createdAt: new Date('2024-07-10'),
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('공연 좌석 결제', async () => {
    expect(
      await controller.consertPayment({
        userId: '12',
        reservationId: 1,
        tokenId: 2,
      }),
    ).toEqual(
      new PaymentResponseDto({
        id: 1,
        userId: '12',
        reservationId: 1,
        createdAt: new Date('2024-07-10'),
      }),
    );
  });
});
