import { TokenStatus } from './entity/auth.entity';

export class Token {
  id: number;
  userId: string;
  status: TokenStatus;
  expiredAt: Date;

  constructor(props: {
    id?: number;
    userId: string;
    status: TokenStatus;
    expiredAt?: Date;
  }) {
    Object.assign(this, props);
    this.extension();
  }

  active(): void {
    this.extension();
    this.status = TokenStatus.ACTIVATE;
  }

  extension(): void {
    // 만료시간 현재 시간에서 5분 후로 설정
    this.expiredAt = new Date(Date.now() + 5 * 60 * 1000);
  }

  expire(): void {
    this.status = TokenStatus.EXPIRED;
  }
}
