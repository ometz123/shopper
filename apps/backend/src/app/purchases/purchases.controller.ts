import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchasesService.create(createPurchaseDto);
  }

  @Get()
  findAll() {
    return this.purchasesService.findAll();
  }

  @Get(':id')
  findByUserId(@Param('id') id: string) {
    return this.purchasesService.findByUserId(id);
  }

  @Get('user/:userId/offer/:offerId')
  findByUserOfferId(
    @Param('userId') userId: string,
    @Param('offerId') offerId: string
  ) {
    return this.purchasesService.findByUserOfferId(userId, offerId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto
  ) {
    return this.purchasesService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchasesService.remove(+id);
  }
}
