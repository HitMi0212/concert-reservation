import { AuthEntity } from 'src/infrastructure/auth/auth.entity';
import { EntityManager } from 'typeorm';

export interface AuthRepository {
  findByTokenId(tokenId: number, _manager?: EntityManager): Promise<AuthEntity>;

  findActiveToken(_manager?: EntityManager): Promise<AuthEntity[]>;

  findWaitingToken(
    limit: number,
    _manager?: EntityManager,
  ): Promise<AuthEntity[]>;

  findExpiredActiveToken(_manager?: EntityManager): Promise<AuthEntity[]>;

  save(token: AuthEntity, _manager?: EntityManager): Promise<AuthEntity>;

  saveAll(
    tokens: AuthEntity[],
    _manager?: EntityManager,
  ): Promise<AuthEntity[]>;
}
