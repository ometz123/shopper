import { Offer } from '../entities/offer.entity';

export type OfferDto = Omit<Offer, 'createdAt' | 'updatedAt' | 'deletedAt'>;
