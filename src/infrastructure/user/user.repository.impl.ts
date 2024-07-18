import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/domain/user/user.repository';
import { UserEntity } from './user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserRepository>,
  ) {}

  async findByUserId(userId: string): Promise<UserEntity> {
    return await this.userRepository.manager.findOneBy(UserEntity, {
      id: userId,
    });
  }

  async saveUser(
    userInfo: UserEntity,
    _manager: EntityManager,
  ): Promise<UserEntity> {
    const manager = _manager ?? this.userRepository.manager;

    return await manager.save(UserEntity, userInfo);
  }
}
