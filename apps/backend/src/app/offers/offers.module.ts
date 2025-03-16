import { forwardRef, Module } from '@nestjs/common';
import { OffersService } from './offers.service';
import { OffersController } from './offers.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { PurchasesModule } from '../purchases/purchases.module';

@Module({
  imports: [PrismaModule, UsersModule, forwardRef(() => PurchasesModule)],
  controllers: [OffersController],
  providers: [OffersService],
})
export class OffersModule {}
