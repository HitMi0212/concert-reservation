import { Body, Controller, Post } from '@nestjs/common';
import { PaymentRequstDto } from '../../dto/payment/request/payment.request.dto';
import { PaymentResponseDto } from '../../dto/payment/response/payment.response.dto';

@Controller('payment')
export class PaymentController {
  @Post()
  async consertPayment(
    @Body()
    paymentInfo: PaymentRequstDto,
  ): Promise<PaymentResponseDto> {
    return new PaymentResponseDto({
      id: 1,
      userId: '12',
      reservationId: 1,
      createdAt: new Date('2024-07-10'),
    });
  }
}
