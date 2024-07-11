import { UserEntity } from './entity/user.entity';

export interface UserRepository {
  findByUserId(id: string): Promise<UserEntity>;

  saveBalance(userInfo: UserEntity): Promise<UserEntity>;
}
