import { Injectable } from '@nestjs/common';
import { UserService } from 'src/domain/user/user.service';
import { UserEntity } from 'src/infrastructure/user/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserFacade {
  constructor(
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async getUserBalance(userId: string): Promise<UserEntity> {
    return await this.userService.findUserById(userId);
  }

  async changeUserBalance(userId: string, amount: number): Promise<UserEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    return await this.userService.chargeUserBalance(userId, amount, manager);
  }

  async useUserBalance(userId: string, amount: number): Promise<UserEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    return await this.userService.useUserBalance(userId, amount, manager);
  }
}
