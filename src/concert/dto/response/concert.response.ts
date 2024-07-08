export class ConcertResponse {
  constructor(
    public id: number,
    public name: string,
    public seats: number,
    public concertDate: string,
  ) {}
}
