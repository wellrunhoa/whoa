export interface Reservation {
  id: string;
  communityId: string;
  amenityId: string;
  reservationDate: Date;
  startTime: Date;
  endTime: Date;
  community: any;
}
