import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from 'src/domain/auth/auth.repository';
import { EntityManager, Repository } from 'typeorm';
import { AuthEntity, TokenStatus } from './auth.entity';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectRepository(AuthEntity)
    private readonly authRepository: Repository<AuthRepository>,
  ) {}

  async findByTokenId(
    tokenId: number,
    _manager?: EntityManager,
  ): Promise<AuthEntity> {
    const manager = _manager ?? this.authRepository.manager;

    const token: AuthEntity = await manager.findOneBy(AuthEntity, {
      id: tokenId,
    });

    return token;
  }

  async findActiveToken(_manager?: EntityManager): Promise<AuthEntity[]> {
    const manager = _manager ?? this.authRepository.manager;

    const tokens: AuthEntity[] = await manager.findBy(AuthEntity, {
      status: TokenStatus.ACTIVATE,
    });

    return tokens;
  }

  async findWaitingToken(
    limit: number,
    _manager?: EntityManager,
  ): Promise<AuthEntity[]> {
    const manager = _manager ?? this.authRepository.manager;

    const tokens: AuthEntity[] = await manager.findBy(AuthEntity, {
      status: TokenStatus.WAIT,
    });

    return tokens;
  }

  async findExpiredActiveToken(
    _manager?: EntityManager,
  ): Promise<AuthEntity[]> {
    const manager = _manager ?? this.authRepository.manager;

    const tokens: AuthEntity[] = await manager
      .createQueryBuilder()
      .select()
      .where('status = :status', { status: TokenStatus.ACTIVATE })
      .andWhere('expired_at < :date', {
        date: new Date(Date.now() - 5 * 60 * 1000),
      })
      .execute();

    return tokens;
  }

  async save(token: AuthEntity, _manager?: EntityManager): Promise<AuthEntity> {
    const manager = _manager ?? this.authRepository.manager;

    const result: AuthEntity = await manager.save(token);

    return result;
  }

  async saveAll(
    tokens: AuthEntity[],
    _manager?: EntityManager,
  ): Promise<AuthEntity[]> {
    const manager = _manager ?? this.authRepository.manager;

    const result: AuthEntity[] = await manager.save(tokens);

    return result;
  }
}
