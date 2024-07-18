import { AuthEntity } from 'src/infrastructure/auth/auth.entity';

export class Token {
  id: number;
  userId: string;
  concertDetailId: number;
  positon: number;
  status: TokenStatus;
  expiredAt: Date;

  constructor(props: {
    id?: number;
    userId: string;
    concertDetailId: number;
    positon?: number;
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

  toInfra(): AuthEntity {
    return new AuthEntity(this);
  }
}

export enum TokenStatus {
  WAIT = 'WAIT',
  ACTIVATE = 'ACTIVATE',
  EXPIRED = 'EXPIRED',
}
