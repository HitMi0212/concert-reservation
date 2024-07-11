import { IsNumber, IsUUID } from 'class-validator';

export class PaymentRequstDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  reservationId: number;

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
