export class SeatResponse {
  constructor(
    public id: number,
    public concertId: number,
    public price: number,
    public status: string,
  ) {}
}
