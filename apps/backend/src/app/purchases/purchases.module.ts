import { forwardRef, Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { OffersModule } from '../offers/offers.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PrismaModule, UsersModule, forwardRef(() => OffersModule)],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
