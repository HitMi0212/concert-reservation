import { Body, Controller, Get, Headers, Patch, Post } from '@nestjs/common';
import { TokenFacade } from 'src/application/auth.token.facade';
import { TokenRequestDto } from '../../dto/auth/request/auth.request.dto';
import { TokenResponseDto } from '../../dto/auth/response/auth.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly tokenFacade: TokenFacade) {}

  @Post('/token')
  async createToken(
    @Body() requestBody: TokenRequestDto,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto(
      await this.tokenFacade.IssueWaitingToken(
        requestBody.userId,
        requestBody.concertId,
      ),
    );
  }

  @Patch('/token/extension')
  async extensionToken(
    @Headers('authorization') tokenId: number,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto(
      await this.tokenFacade.extensionWaitingToken(tokenId),
    );
  }

  @Get('/token/validation')
  async validateToken(
    @Headers('authorization') tokenId: number,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto(
      await this.tokenFacade.validateWaitingToken(tokenId),
    );
  }

  @Patch('/token/expire')
  async expireToken(
    @Headers('authorization') tokenId: number,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto(
      await this.tokenFacade.expireWaitingToken(tokenId),
    );
  }
}
