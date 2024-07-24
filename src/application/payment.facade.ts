import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/domain/auth/auth.service';
import { ConcertService } from 'src/domain/concert/concert.service';
import { Concert } from 'src/domain/concert/model/concert';
import { Seat } from 'src/domain/concert/model/seat';
import { PaymentService } from 'src/domain/payment/payment.service';
import { UserService } from 'src/domain/user/user.service';
import { ReservationEntity } from 'src/infrastructure/concert/consert.seat.reservation.entity';
import {
  PaymentDetailEntity,
  PaymentEntity,
} from 'src/infrastructure/payment/payment.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class PaymentFacade {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly concertService: ConcertService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource,
  ) {}

  async createPayment(userId: string, tokenId: number, reservationId: number) {
    // 토큰 검증
    await this.authService.validateToken(tokenId);

    // 해당 사용자 예약 건 조회
    const reservation: ReservationEntity =
      await this.concertService.findReservation(userId, reservationId);

    // 콘서트 정보 조회
    const concert: Concert = await this.concertService.findConcertByDetailId(
      reservation.concertDetailId,
    );

    // 좌석 정보 조회
    const seat: Seat = await this.concertService.findConcertSeatById(
      reservation.seatId,
    );

    let newPayment: PaymentEntity = new PaymentEntity({
      userId,
      reservationId,
      createdAt: new Date(),
    });

    await this.dataSource.createEntityManager().transaction(async (manager) => {
      // 결제 생성
      newPayment = await this.paymentService.savePayment(newPayment, manager);

      // 부가 정보 저장
      const newPaymentDetail: PaymentDetailEntity = new PaymentDetailEntity({
        paymentId: newPayment.id,
        concertDetailId: reservation.concertDetailId,
        seatId: seat.id,
        price: seat.price,
        seatNumber: seat.seatNumber,
        concertName: concert.name,
        concertDate: concert.concertDetails.find(
          (detail) => detail.id === reservation.concertDetailId,
        )!.concertDate,
      });
      await this.paymentService.savePaymentDetail(newPaymentDetail, manager);

      // 잔액 차감
      await this.userService.useUserBalance(userId, seat.price, manager);

      // 좌석 상태 변경
      seat.complete();
      await this.concertService.saveSeat(seat, manager);

      // 토큰 만료
      await this.authService.expireToken(tokenId);
    });
  }
}
