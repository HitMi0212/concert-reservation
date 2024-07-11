import { AuthEntity } from './entity/auth.entity';

export interface AuthRepository {
  createToken(userId: string, concertId: number): Promise<AuthEntity>;

  findByTokenId(tokenId: number): Promise<AuthEntity>;

  extensionToken(tokenId: number): Promise<AuthEntity>;

  validateToken(tokenId: number): Promise<AuthEntity>;

  expireToken(tokenId: number): Promise<AuthEntity>;
}
