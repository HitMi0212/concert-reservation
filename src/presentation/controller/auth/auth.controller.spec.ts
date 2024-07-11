import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { TokenResponseDto } from '../../dto/auth/response/auth.response.dto';
import { TokenStatusEnum } from '../../dto/auth/enum/auth.enum';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthController,
          useValue: {
            createToken: jest.fn(),
            extensionToken: jest.fn(),
            validateToken: jest.fn(),
            expireToken: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('대기열 토큰 발급', async () => {
    // given
    const body = {
      userId: '12',
      concertId: 1,
    };

    // when
    const result = await controller.createToken(body);

    // then
    expect(result).toBeInstanceOf(TokenResponseDto);
  });

  it('대기열 토큰 연장', async () => {
    // given
    const tokenId = 1;

    // when
    const result = await controller.extensionToken(tokenId);

    // then
    expect(result).toBeInstanceOf(TokenResponseDto);
  });

  it('대기열 토큰 검증', async () => {
    // given
    const tokenId = 1;

    // when
    const result = await controller.validateToken(tokenId);

    // then
    expect(result).toBeInstanceOf(TokenResponseDto);
  });

  it('대기열 토큰 만료', async () => {
    // given
    const tokenId = 1;

    // when
    const result = await controller.expireToken(tokenId);

    // then
    expect(result).toBeInstanceOf(TokenResponseDto);
    expect(result.status).toEqual(TokenStatusEnum.EXPIRED);
  });
});
