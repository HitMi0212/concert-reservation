export class ReservationResponse {
  constructor(
    public userId: number,
    public concertId: number,
    public seatId: number,
    public reservationDate: string,
  ) {}
}
