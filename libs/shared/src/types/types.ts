export interface IOffer {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  limitPerUser: number;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IPurchase {
  id: string;
  userId: string;
  offerId: string;
  quantity: number;
}

export interface IUserOfferPurchase {
  id: string;
  userId: string;
  offerId: string;
  quantity: number;
}