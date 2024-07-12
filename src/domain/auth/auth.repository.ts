import { Token } from './auth.model';
import { AuthEntity } from './entity/auth.entity';

export interface AuthRepository {
  findByTokenId(tokenId: number): Promise<Token>;

  findActiveToken(): Promise<Token[]>;

  findWaitingToken(limit: number): Promise<Token[]>;

  findExpiredActiveToken(): Promise<Token[]>;

  save(token: AuthEntity): Promise<Token>;

  saveAll(tokens: Token[]): Promise<Token[]>;
}
