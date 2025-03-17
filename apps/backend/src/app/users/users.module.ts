import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { OffersModule } from '../offers/offers.module';
import { PurchasesModule } from '../purchases/purchases.module';

@Module({
  imports:[
    PrismaModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
