import { UserEntity } from './entity/user.entity';
import { User } from './user.model';

export interface UserRepository {
  findByUserId(id: string): Promise<User>;

  saveUser(userInfo: UserEntity): Promise<User>;
}
