import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/domain/auth/auth.service';
import { ConcertService } from 'src/domain/concert/concert.service';
import { UserService } from 'src/domain/user/user.service';
import { AuthEntity } from 'src/infrastructure/auth/auth.entity';
import { DataSource } from 'typeorm';

// 대기열
@Injectable()
export class TokenFacade {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly concertService: ConcertService,
    private readonly dataSource: DataSource,
  ) {}

  /**
   * 대기열 토큰 발급
   * @Param userId: UUID
   */
  async IssueWaitingToken(
    userId: string,
    concertDetailId: number,
  ): Promise<AuthEntity> {
    await this.userService.findUserById(userId);
    await this.concertService.findConcertDetailById(concertDetailId);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    return await this.authService.createToken(userId, concertDetailId, manager);
  }

  /**
   * 대기열 토큰 검증
   * @Param tokenId: number
   */
  async validateWaitingToken(tokenId: number): Promise<AuthEntity> {
    return await this.authService.validateToken(tokenId);
  }

  // 대기열에서 비어있는 만큼 활성화
  async activeWaitingToken(): Promise<AuthEntity[]> {
    const result: AuthEntity[] = await this.authService.activeToken();

    return result;
  }

  // 만료시간이 지난 토큰 만료 처리
  async expireActiveToken(): Promise<AuthEntity[]> {
    return await this.authService.expireActiveToken();
  }
}
