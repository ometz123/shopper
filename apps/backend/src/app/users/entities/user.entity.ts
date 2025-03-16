import { Purchase } from '../../purchases/entities/purchase.entity';

export class User {
  id: string;
  email: string;
  password: string;
  name: string;
  purchases?: Purchase[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
