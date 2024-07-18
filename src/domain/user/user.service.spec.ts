import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../presentation/controller/user/user.controller';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

const userEntity = new UserEntity({
  id: '1',
  user_name: '유저1',
  balance: 1000,
});

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: UserService,
          useValue: {
            findUserBalance: jest.fn().mockResolvedValue({
              id: '1',
              user_name: '유저1',
              balance: 1000,
            }),
            chargeUserBalance: jest
              .fn()
              .mockResolvedValue({ id: '1', balance: 21000 }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('사용자 정보(포인트) 조회', () => {
    it('사용자 포인트 조회', async () => {
      // Given
      const userId = '1';

      // When
      const result = await service.findUserBalance(userId);

      // Then
      expect(result.balance).toBe(userEntity.balance);
    });

    it('사용자가 없을 경우', async () => {
      jest
        .spyOn(service, 'findUserBalance')
        .mockRejectedValueOnce(
          new NotFoundException('사용자 정보가 존재하지 않습니다.'),
        );
      const userId = '2';

      await expect(service.findUserBalance(userId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('사용자 잔액 충전', () => {
    it('사용자 잔액 충전', async () => {
      // Given
      const userId = '1';
      const amount = 20000.0;

      // When
      const result = await service.chargeUserBalance({
        userId: userId,
        amount: amount,
      });

      // Then
      expect(result.balance).toBe(userEntity.balance + amount);
    });

    it('사용자가 없을 경우', async () => {
      jest
        .spyOn(service, 'chargeUserBalance')
        .mockRejectedValueOnce(
          new NotFoundException('사용자 정보가 존재하지 않습니다.'),
        );
      const userId = '2';
      const amount = 20000.0;

      await expect(
        service.chargeUserBalance({ userId: userId, amount: amount }),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
