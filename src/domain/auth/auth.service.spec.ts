import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../presentation/controller/auth/auth.controller';
import { TokenStatusEnum } from '../../presentation/dto/auth/enum/auth.enum';
import { AuthService } from './auth.service';
import { AuthEntity } from './entity/auth.entity';
import { NotAcceptableException, NotFoundException } from '@nestjs/common';

const tokenEntity = new AuthEntity({
  id: 1,
  user_id: '1',
  concert_id: 1,
  status: TokenStatusEnum.WAIT,
  expiredAt: new Date('2024-07-11 22:05:00'),
});

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            findByTokenId: jest.fn().mockResolvedValue(tokenEntity),
            createToken: jest.fn().mockResolvedValue({
              id: 1,
              user_id: '1',
              concert_id: 1,
              status: TokenStatusEnum.WAIT,
              expiredAt: new Date('2024-07-11 22:05:00'),
            }),
            extensionToken: jest.fn().mockResolvedValue({
              id: 1,
              user_id: '1',
              concert_id: 1,
              status: TokenStatusEnum.ACTIVATE,
              expiredAt: new Date('2024-07-11 22:15:00'),
            }),
            validateToken: jest.fn().mockResolvedValue({
              id: 1,
              user_id: '1',
              concert_id: 1,
              status: TokenStatusEnum.WAIT,
              expiredAt: new Date('2024-07-11 22:05:00'),
            }),
            expireToken: jest.fn().mockResolvedValue({
              id: 1,
              user_id: '1',
              concert_id: 1,
              status: TokenStatusEnum.EXPIRED,
              expiredAt: new Date('2024-07-11 10:05:00'),
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('대기열 토큰 생성', async () => {
    // Given
    const userId = '1';
    const concertId = 1;

    // When
    const result = await service.createToken(userId, concertId);

    // Then
    expect(result.status).toEqual(TokenStatusEnum.WAIT);
  });

  describe('대기열 토큰 검증', () => {
    it('대기열 토큰 검증 성공', async () => {
      // Given
      const tokenId = 1;

      // When
      const result = await service.validateToken(tokenId);

      // Then
      expect(result).toEqual(tokenEntity);
    });

    it('토큰 정보 없을 경우', async () => {
      const spy = jest.spyOn(service, 'validateToken');
      spy.mockRejectedValueOnce(new NotFoundException('토큰 정보가 없습니다.'));

      const tokenId = 2;

      await expect(service.validateToken(tokenId)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('토큰 정보 상태가 만료인 경우', async () => {
      const spy = jest.spyOn(service, 'validateToken');
      spy.mockRejectedValueOnce(
        new NotAcceptableException('토큰 정보가 만료되었습니다.'),
      );

      const tokenId = 2;

      await expect(service.validateToken(tokenId)).rejects.toThrow(
        NotAcceptableException,
      );
    });

    it('토큰 정보 만료시간이 지난 경우', async () => {
      const spy = jest.spyOn(service, 'validateToken');
      spy.mockRejectedValueOnce(
        new NotAcceptableException('토큰 정보가 만료되었습니다.'),
      );

      const tokenId = 1;

      await expect(service.validateToken(tokenId)).rejects.toThrow(
        NotAcceptableException,
      );
    });
  });

  it('대기열 토큰 연장', async () => {
    // Given
    const tokenId = 1;

    // When
    const result = await service.extensionToken(tokenId);

    // Then
    const expectedDate = new Date(
      tokenEntity.expiredAt.setMinutes(tokenEntity.expiredAt.getMinutes() + 10),
    );

    expect(result.expiredAt).toEqual(expectedDate);
  });
});
