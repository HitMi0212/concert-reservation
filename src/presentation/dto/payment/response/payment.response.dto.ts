import { IsDate, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class PaymentResponseDto {
  @IsNumber()
  id: number;

  @IsUUID()
  userId: string;

  @IsNumber()
  reservationId: number;

  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  deletedAt: Date;

  constructor(args: PaymentResponseProp) {
    Object.assign(this, args);
  }
}

type PaymentResponseProp = {
  id: number;
  userId: string;
  reservationId: number;
  createdAt: Date;
  deletedAt?: Date;
};
