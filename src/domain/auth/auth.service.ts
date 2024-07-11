import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { TokenStatusEnum } from '../../presentation/dto/auth/enum/auth.enum';
import { AuthRepository } from './auth.repository';
import { AuthEntity } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async createToken(userId: string, concertId: number): Promise<AuthEntity> {
    return this.authRepository.createToken(userId, concertId);
  }

  async extensionToken(tokenId: number): Promise<AuthEntity> {
    const token = await this.authRepository.findByTokenId(tokenId);

    return this.authRepository.extensionToken(token.id);
  }

  async validateToken(tokenId: number): Promise<AuthEntity> {
    const token = await this.authRepository.findByTokenId(tokenId);

    if (!token) {
      throw new NotFoundException('토큰 정보가 없습니다.');
    } else if (token.status === TokenStatusEnum.EXPIRED) {
      throw new NotAcceptableException('토큰 정보가 만료되었습니다.');
    } else if (new Date(token.expiredAt).getTime() < new Date().getTime()) {
      await this.expireToken(tokenId);
      throw new NotAcceptableException('토큰 정보가 만료되었습니다.');
    }

    return token;
  }

  async expireToken(tokenId: number): Promise<AuthEntity> {
    return this.authRepository.expireToken(tokenId);
  }
}
