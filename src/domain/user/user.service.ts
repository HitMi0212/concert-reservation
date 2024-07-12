import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserRequstDto } from 'src/presentation/dto/user/request/user.request.dto';
import { UserRepository } from './user.repository';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(id: string): Promise<User> {
    const user: User = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new NotFoundException('사용자 정보가 존재하지 않습니다.');
    }

    return user;
  }

  async chargeUserBalance(chargeInfo: UserRequstDto): Promise<UserEntity> {
    const user: User = await this.findUserById(chargeInfo.userId);
    user.chargeBalance(chargeInfo.amount);

    return await this.userRepository.saveUser(user);
  }
}
