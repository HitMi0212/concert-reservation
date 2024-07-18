import { Body, Controller, Get, Headers, Patch, Post } from '@nestjs/common';
import { TokenFacade } from 'src/application/auth.token.facade';
import { TokenRequestDto } from '../../dto/auth/request/auth.request.dto';
import { TokenResponseDto } from '../../dto/auth/response/auth.response.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('토큰 API')
export class AuthController {
  constructor(private readonly tokenFacade: TokenFacade) {}

  @ApiOperation({
    summary: '대기열 토큰 생성',
  })
  @ApiOkResponse({ type: TokenResponseDto })
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

  @ApiOperation({
    summary: '대기열 토큰 연장',
  })
  @ApiOkResponse({ type: TokenResponseDto })
  @Patch('/token/extension')
  async extensionToken(
    @Headers('authorization') tokenId: number,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto(
      await this.tokenFacade.extensionWaitingToken(tokenId),
    );
  }

  @ApiOperation({
    summary: '대기열 토큰 검증',
  })
  @ApiOkResponse({ type: TokenResponseDto })
  @Get('/token/validation')
  async validateToken(
    @Headers('authorization') tokenId: number,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto(
      await this.tokenFacade.validateWaitingToken(tokenId),
    );
  }

  @ApiOperation({
    summary: '대기열 토큰 만료',
  })
  @ApiOkResponse({ type: TokenResponseDto })
  @Patch('/token/expire')
  async expireToken(
    @Headers('authorization') tokenId: number,
  ): Promise<TokenResponseDto> {
    return new TokenResponseDto(
      await this.tokenFacade.expireWaitingToken(tokenId),
    );
  }
}
