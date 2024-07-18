import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UserRequstDto } from '../../dto/user/request/user.request.dto';
import { UserResponseDto } from '../../dto/user/response/user.response.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserFacade } from 'src/application/user.facade';

@Controller('user')
@ApiTags('사용자 잔액 API')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}

  @ApiOperation({
    summary: '유저 잔액 조회',
  })
  @ApiOkResponse({ type: UserResponseDto })
  @Get('/balance/:id')
  async findUserBalance(@Param('id') userId: string): Promise<UserResponseDto> {
    return new UserResponseDto(await this.userFacade.getUserBalance(userId));
  }

  @ApiOperation({
    summary: '유저 잔액 충전',
  })
  @ApiOkResponse({ type: UserResponseDto })
  @Patch('/balance/charge')
  async chargeUserBalance(
    @Body() chargeInfo: UserRequstDto,
  ): Promise<UserResponseDto> {
    return new UserResponseDto(
      await this.userFacade.changeUserBalance(
        chargeInfo.userId,
        chargeInfo.amount,
      ),
    );
  }
}
