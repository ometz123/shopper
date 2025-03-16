import { Inject, Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PurchaseDto } from './dto/purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<PurchaseDto> {
    const newPurchase = await this.prismaService.purchase.create({
      data: createPurchaseDto,
    });

    const purchaseDto: PurchaseDto = {
      id: newPurchase.id,
      userId: newPurchase.userId,
      offerId: newPurchase.offerId,
      quantity: newPurchase.quantity,
    };

    return purchaseDto;
  }

  findAll() {
    return `This action returns all purchases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
