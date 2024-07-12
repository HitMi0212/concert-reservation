import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Token } from './auth.model';
import { AuthRepository } from './auth.repository';
import { TokenStatus } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async getToken(tokenId: number): Promise<Token> {
    const token = await this.authRepository.findByTokenId(tokenId);

    if (!token) {
      throw new NotFoundException('토큰 정보가 없습니다.');
    }

    return token;
  }

  async createToken(userId: string): Promise<Token> {
    const newToken = new Token({ userId, status: TokenStatus.WAIT });
    return await this.authRepository.save(newToken);
  }

  async validateToken(tokenId: number): Promise<Token> {
    const token = await this.getToken(tokenId);

    if (
      token.status === TokenStatus.EXPIRED ||
      token.expiredAt.getTime() < new Date().getTime()
    ) {
      throw new ForbiddenException('토큰 정보가 만료되었습니다.');
    }

    return token;
  }

  async expireToken(tokenId: number): Promise<Token> {
    const token = await this.getToken(tokenId);
    token.expire();

    return await this.authRepository.save(token);
  }

  async activeToken(): Promise<Token[] | undefined> {
    const activeMax = 30;
    const activeTokens = await this.authRepository.findActiveToken();

    if (activeMax > activeTokens.length) {
      const remain = activeMax - activeTokens.length;
      const waitingTokens = await this.authRepository.findWaitingToken(remain);

      waitingTokens.forEach((token) => token.active());

      return await this.authRepository.saveAll(waitingTokens);
    }

    return undefined;
  }

  async expireActiveToken(): Promise<Token[] | undefined> {
    const expiredTokens = await this.authRepository.findExpiredActiveToken();

    if (expiredTokens && expiredTokens.length) {
      expiredTokens.forEach((token) => token.expire());

      return await this.authRepository.saveAll(expiredTokens);
    }

    return undefined;
  }
}
