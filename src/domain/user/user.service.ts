import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/infrastructure/user/user.entity';
import { UserRepository } from './user.repository';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUserById(id: string): Promise<UserEntity> {
    const user: UserEntity = await this.userRepository.findByUserId(id);

    if (!user) {
      throw new NotFoundException('사용자 정보가 존재하지 않습니다.');
    }

    return user;
  }

  async chargeUserBalance(
    userId: string,
    amount: number,
    _manager: EntityManager,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.findUserById(userId);
    user.chargeBalance(amount);

    return await this.userRepository.saveUser(user, _manager);
  }

  async useUserBalance(
    userId: string,
    amount: number,
    _manager: EntityManager,
  ): Promise<UserEntity> {
    const user: UserEntity = await this.findUserById(userId);
    user.useBalance(amount);

    return await this.userRepository.saveUser(user, _manager);
  }
}
