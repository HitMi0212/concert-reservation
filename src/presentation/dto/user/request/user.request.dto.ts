import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsUUID } from 'class-validator';

export class UserRequstDto {
  @ApiProperty()
  @IsUUID()
  userId: string;

  @ApiProperty()
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
