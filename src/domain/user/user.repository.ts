import { UserEntity } from 'src/infrastructure/user/user.entity';
import { EntityManager } from 'typeorm';

export interface UserRepository {
  findByUserId(userId: string): Promise<UserEntity>;

  saveUser(userInfo: UserEntity, _manager: EntityManager): Promise<UserEntity>;
}
