import { Body, Controller, Get, Headers, Patch, Post } from '@nestjs/common';
import { TokenStatusEnum } from '../../dto/auth/enum/auth.enum';
import { TokenRequestDto } from '../../dto/auth/request/auth.request.dto';
import { TokenResponseDto } from '../../dto/auth/response/auth.response.dto';

@Controller('auth')
export class AuthController {
  // constructor(private readonly queueService: QueueService) {}

  @Post('/token')
  async createToken(
    @Body() requestBody: TokenRequestDto,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto({
      id: 1,
      userId: '12',
      concertId: 1,
      status: TokenStatusEnum.WAIT,
      expiredAt: new Date('2024-07-31'),
    });
  }

  @Patch('/token/extension')
  async extensionToken(
    @Headers('authorization') tokenId: number,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto({
      id: tokenId,
      userId: '12',
      concertId: 1,
      status: TokenStatusEnum.WAIT,
      expiredAt: new Date('2024-07-31'),
    });
  }

  @Get('/token/validation')
  async validateToken(
    @Headers('authorization') tokenId: number,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto({
      id: tokenId,
      userId: '12',
      concertId: 1,
      status: TokenStatusEnum.WAIT,
      expiredAt: new Date('2024-07-31'),
    });
  }

  @Patch('/token/expire')
  async expireToken(
    @Headers('authorization') tokenId: number,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto({
      id: tokenId,
      userId: '12',
      concertId: 1,
      status: TokenStatusEnum.EXPIRED,
      expiredAt: new Date('2024-07-12'),
    });
  }
}
