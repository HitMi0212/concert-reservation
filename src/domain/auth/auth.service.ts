import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AuthEntity, TokenStatus } from 'src/infrastructure/auth/auth.entity';
import { EntityManager } from 'typeorm';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async getToken(
    tokenId: number,
    _manager?: EntityManager,
  ): Promise<AuthEntity> {
    const token: AuthEntity = await this.authRepository.findByTokenId(
      tokenId,
      _manager,
    );

    if (!token) {
      throw new NotFoundException('토큰 정보가 없습니다.');
    }

    return token;
  }

  async createToken(
    userId: string,
    concertDetailId: number,
    _manager?: EntityManager,
  ): Promise<AuthEntity> {
    const newToken = new AuthEntity({
      userId,
      concertDetailId,
      status: TokenStatus.WAIT,
    });
    return await this.authRepository.save(newToken, _manager);
  }

  async validateToken(
    tokenId: number,
    _manager?: EntityManager,
  ): Promise<AuthEntity> {
    const token: AuthEntity = await this.getToken(tokenId, _manager);

    if (
      token.status === TokenStatus.EXPIRED ||
      token.expiredAt.getTime() < new Date().getTime()
    ) {
      throw new ForbiddenException('토큰 정보가 만료되었습니다.');
    }

    return token;
  }

  async expireToken(
    tokenId: number,
    _manager?: EntityManager,
  ): Promise<AuthEntity> {
    const token: AuthEntity = await this.getToken(tokenId, _manager);
    token.expire();

    return await this.authRepository.save(token, _manager);
  }

  async activeToken(_manager?: EntityManager): Promise<AuthEntity[]> {
    const activeMax = 30;
    const activeTokens = await this.authRepository.findActiveToken(_manager);

    if (activeMax > activeTokens.length) {
      const remain: number = activeMax - activeTokens.length;
      const waitingTokens: AuthEntity[] =
        await this.authRepository.findWaitingToken(remain, _manager);

      waitingTokens.forEach((token) => token.active());

      return await this.authRepository.saveAll(waitingTokens, _manager);
    }

    return undefined;
  }

  async expireActiveToken(_manager?: EntityManager): Promise<AuthEntity[]> {
    const expiredTokens: AuthEntity[] =
      await this.authRepository.findExpiredActiveToken(_manager);

    if (expiredTokens && expiredTokens.length) {
      expiredTokens.forEach((token) => token.expire());

      return await this.authRepository.saveAll(expiredTokens, _manager);
    }

    return undefined;
  }
}
