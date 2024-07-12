import { Injectable } from '@nestjs/common';
import { Token } from 'src/domain/auth/auth.model';
import { AuthService } from 'src/domain/auth/auth.service';
import { UserService } from 'src/domain/user/user.service';

// 대기열
@Injectable()
export class TokenFacade {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * 대기열 토큰 발급
   * @Param userId: UUID
   */
  async IssueWaitingToken(userId: string) {
    await this.userService.findUserById(userId);

    return await this.authService.createToken(userId);
  }

  /**
   * 대기열 토큰 검증
   * @Param tokenId: number
   */
  async validateWaitingToken(tokenId: number) {
    return await this.authService.validateToken(tokenId);
  }

  // 대기열에서 비어있는 만큼 활성화
  async activeWaitingToken(): Promise<Token[] | undefined> {
    return await this.authService.activeToken();
  }

  // 만료시간이 지난 토큰 만료 처리
  async expireActiveToken(): Promise<Token[] | undefined> {
    return await this.authService.expireActiveToken();
  }
}
