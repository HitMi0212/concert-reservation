import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';

export class PaymentRequstDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
  @IsNumber()
  reservationId: number;

  @ApiProperty()
  @IsNumber()
  tokenId: number;

  constructor(args: PaymentRequstProp) {
    Object.assign(this, args);
  }
}

type PaymentRequstProp = {
  userId: string;
  reservationId: number;
  tokenId: number;
};
