import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserRequstDto } from '../../dto/user/request/user.request.dto';
import { UserResponseDto } from '../../dto/user/response/user.response.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('사용자 잔액 API')
export class UserController {
  @ApiOperation({
    summary: '유저 잔액 조회',
  })
  @ApiOkResponse({ type: UserResponseDto })
  @Get('/balance/:id')
  async findUserBalance(@Param('id') userId: string): Promise<UserResponseDto> {
    return new UserResponseDto({ id: '12', name: 'seung', balance: 1000 });
  }

  @ApiOperation({
    summary: '유저 잔액 충전',
  })
  @ApiOkResponse({ type: UserResponseDto })
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
