import { BadRequestException } from '@nestjs/common';

export class User {
  id: string;
  userName: string;
  balance: number;

  constructor(props: { id?: string; userName: string; balance: number }) {
    Object.assign(this, props);
  }

  chargeBalance(amount: number): void {
    if (amount <= 0) {
      throw new BadRequestException('잘못된 금액입니다.');
    }
    this.balance += amount;
  }

  useBalance(amount: number): void {
    if (amount <= 0) {
      throw new BadRequestException('잘못된 금액입니다.');
    }
    if (amount > this.balance) {
      throw new BadRequestException('잔액이 부족합니다.');
    }
    this.balance -= amount;
  }
}
