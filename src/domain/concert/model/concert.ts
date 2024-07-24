import { NotFoundException } from '@nestjs/common';
import {
  ConcertDetailEntity,
  ConcertEntity,
} from 'src/infrastructure/concert/concert.entity';
import { ConcertDetail } from './concert.detail';

export class Concert {
  id: number;
  name: string;
  concertDetails: ConcertDetail[];

  constructor(props?: {
    id?: number;
    name: string;
    concertDetails?: ConcertDetail[];
  }) {
    Object.assign(this, props);
  }

  static mappingEntity(
    concert: ConcertEntity | null,
    details: ConcertDetailEntity[],
  ): Concert {
    if (!concert) {
      return new Concert();
    }

    return new Concert({
      id: concert.id,
      name: concert.name,
      concertDetails: details.map((detail) =>
        ConcertDetail.mappingEntity(detail),
      ),
    });
  }

  findAvailable(): void {
    this.concertDetails = this.concertDetails.filter((detail) => {
      detail.findAvailableSeat();
      return detail.seats.length;
    });
  }

  findConcertDate(date: string): void {
    const searchDate = new Date(date);
    this.concertDetails = this.concertDetails.filter((detail) => {
      searchDate >= detail.reservationDate && searchDate <= detail.concertDate;
    });

    if (!this.concertDetails || !this.concertDetails.length) {
      throw new NotFoundException('해당 날짜에 예약가능한 콘서트가 없습니다.');
    }
  }

  findAvailableSeat(): void {}
}
