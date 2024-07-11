import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserResponseDto } from '../../dto/user/response/user.response.dto';

const userEntity = new UserResponseDto({
  id: '12',
  name: 'seung',
  balance: 1000,
});

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserController,
          useValue: {
            findUserBalance: jest.fn().mockResolvedValue(userEntity),
            chargeUserBalance: jest.fn().mockResolvedValue(
              new UserResponseDto({
                id: '12',
                name: 'seung',
                balance: 21000,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('사용자 포인트 조회', async () => {
    // Given
    const userId = '12';

    // When
    const result = await controller.findUserBalance(userId);

    // Then
    expect(result.balance).toBe(userEntity.balance);
  });

  it('사용자 잔액 충전', async () => {
    // Given
    const userId = '12';
    const amount = 20000.0;

    // When
    const result = await controller.chargeUserBalance({
      userId: userId,
      amount: amount,
    });

    // Then
    expect(result.balance).toBe(amount);
  });
});
