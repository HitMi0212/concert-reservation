import { IsDecimal, IsUUID } from 'class-validator';

export class UserRequstDto {
  @IsUUID()
  userId: string;

  @IsDecimal()
  amount: number;

  constructor(args: UserRequstProp) {
    Object.assign(this, args);
  }
}

type UserRequstProp = {
  userId: string;
  amount: number;
};
