import { Purchase } from '../entities/purchase.entity'

export type PurchaseDto = Omit<Purchase, 'createdAt' | 'updatedAt' | 'deletedAt'>;
