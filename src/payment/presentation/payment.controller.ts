import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BalanceResponse } from '../dto/response/balance.response';

@Controller('payment')
export class PaymentController {
  @Get('balace/:id')
  findBalance(@Param('id') userId: number) {
    return new BalanceResponse(15000);
  }

  @Patch('/charge')
  chargeBalance(@Body() chargeInfo: { userId: number; amount: number }) {
    return new BalanceResponse(15000);
  }

  @Post()
  consertPayment(
    @Body()
    paymentInfo: {
      userId: number;
      reservationId: number;
      token: string;
    },
  ) {
    return { status: 'SUCCESS' };
  }
}
