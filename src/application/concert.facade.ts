import { Injectable } from '@nestjs/common';
import { ConcertService } from 'src/domain/concert/concert.service';
import { Concert } from 'src/domain/concert/model/concert';
import { Reservation } from 'src/domain/concert/model/reservation';
import { Seat } from 'src/domain/concert/model/seat';
import { DataSource } from 'typeorm';

@Injectable()
export class ConcertFacade {
  constructor(
    private readonly concertService: ConcertService,
    private readonly dataSource: DataSource,
  ) {}

  async getAvailableConcert(): Promise<Concert[]> {
    return await this.concertService.findAvailableConcert();
  }

  async getConcertByDate(date: string): Promise<Concert[]> {
    return await this.concertService.findConcertByDate(date);
  }

  async findConcertSeat(concertDetailId: number): Promise<Seat[]> {
    return await this.concertService.findConcertSeat(concertDetailId);
  }

  async seatReservation(seatId: number, userId: string): Promise<Reservation> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const manager = queryRunner.manager;

    return await this.concertService.seatReservation(seatId, userId, manager);
  }
}
