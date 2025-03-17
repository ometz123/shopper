export class Offer {
  id: string;
  title: string;
  price: number;
  limitPerUser:number;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
