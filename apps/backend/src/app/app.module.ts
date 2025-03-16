import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    OffersModule,
    PurchasesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
