import { User } from '../../users/entities/user.entity';
import { Offer } from '../../offers/entities/offer.entity';

export class Purchase {
  id: string;
  userId: string;
  offerId: string;
  user?: User;
  offer?: Offer;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
