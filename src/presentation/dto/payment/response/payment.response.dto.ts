import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsUUID } from 'class-validator';

export class PaymentResponseDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNumber()
  reservationId: number;

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
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
