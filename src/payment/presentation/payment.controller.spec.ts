import { Test, TestingModule } from '@nestjs/testing';
import { PaymentController } from './payment.controller';
import { BalanceResponse } from '../dto/response/balance.response';

describe('PaymentController', () => {
  let controller: PaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentController,
          useValue: {
            findBalance: jest
              .fn()
              .mockResolvedValue(new BalanceResponse(15000)),
            chargeBalance: jest
              .fn()
              .mockResolvedValue(new BalanceResponse(15000)),
            concertPayment: jest.fn().mockResolvedValue({ status: 'SUCCESS' }),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentController>(PaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('잔액 조회', async () => {
    expect(controller.findBalance(12)).toEqual(new BalanceResponse(15000));
  });

  it('잔액 충전', async () => {
    expect(controller.chargeBalance({ userId: 12, amount: 15000 })).toEqual(
      new BalanceResponse(15000),
    );
  });

  it('공연 좌석 예매', async () => {
    expect(
      controller.consertPayment({
        userId: 12,
        reservationId: 1,
        token: 'test',
      }),
    ).toEqual({ status: 'SUCCESS' });
  });
});
