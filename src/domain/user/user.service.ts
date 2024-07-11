import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entity/user.entity';
import { UserRequstDto } from 'src/presentation/dto/user/request/user.request.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserBalance(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new NotFoundException('사용자 정보가 존재하지 않습니다.');
    }

    return user;
  }

  async chargeUserBalance(chargeInfo: UserRequstDto): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findByUserId(
      chargeInfo.userId,
    );

    if (!user) {
      throw new NotFoundException('사용자 정보가 존재하지 않습니다.');
    }

    user.balance += chargeInfo.amount;
    await this.userRepository.saveBalance(user);

    return user;
  }
}
