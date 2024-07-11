import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserRequstDto } from '../../dto/user/request/user.request.dto';
import { UserResponseDto } from '../../dto/user/response/user.response.dto';

@Controller('user')
export class UserController {
  @Get('/balance/:id')
  async findUserBalance(@Param('id') userId: string): Promise<UserResponseDto> {
    return new UserResponseDto({ id: '12', name: 'seung', balance: 1000 });
  }

  @Patch('/balance/charge')
  async chargeUserBalance(
    @Body() chargeInfo: UserRequstDto,
  ): Promise<UserResponseDto> {
    return new UserResponseDto({
      id: chargeInfo.userId,
      name: 'user',
      balance: chargeInfo.amount,
    });
  }
}
