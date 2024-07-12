import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TokenFacade } from 'src/application/auth.token.facade';

@Injectable()
export class TokenActiveScheduler {
  constructor(private readonly tokenFacade: TokenFacade) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async activeTokens() {
    await this.tokenFacade.activeWaitingToken();
  }
}
