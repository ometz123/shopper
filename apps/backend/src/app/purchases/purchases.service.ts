import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { PurchaseDto } from './dto/purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<PurchaseDto> {
    const newPurchase = await this.prismaService.$transaction(async (tx) => {
      const offer = await tx.offer.findUnique({
        where: { id: createPurchaseDto.offerId },
      });
      if (!offer) {
        throw new NotFoundException('Offer not found');
      }

      const userOfferPurchase = await tx.purchase.findFirst({
        where: {
          offerId: createPurchaseDto.offerId,
          userId: createPurchaseDto.userId,
        },
      });

      if (
        createPurchaseDto.quantity + (userOfferPurchase?.quantity || 0) <=
        offer.limitPerUser
      ) {
        return tx.purchase.upsert({
          where: {
            userId_offerId: {
              userId: createPurchaseDto.userId,
              offerId: createPurchaseDto.offerId,
            },
          },
          update: {
            quantity:
              (userOfferPurchase?.quantity || 0) + createPurchaseDto.quantity,
          },
          create: {
            userId: createPurchaseDto.userId,
            offerId: createPurchaseDto.offerId,
            quantity: createPurchaseDto.quantity,
          },
        });
      } else {
        if (!userOfferPurchase) {
          throw new InternalServerErrorException('Offer not found');
        }

        const userOfferPurchaseDto: PurchaseDto = {
          id: userOfferPurchase.id,
          userId: userOfferPurchase?.userId,
          offerId: userOfferPurchase?.offerId,
          quantity: userOfferPurchase?.quantity,
        };

        throw new NotAcceptableException(
          userOfferPurchaseDto,
          'Purchase quantity exceeds limit'
        );
      }
    });

    return {
      id: newPurchase.id,
      userId: newPurchase.userId,
      offerId: newPurchase.offerId,
      quantity: newPurchase.quantity,
    };
  }

  findAll() {
    return `This action returns all purchases`;
  }

  async findByUserId(id: string): Promise<PurchaseDto[]> {
    const purchases = await this.prismaService.purchase.findMany({
      where: { userId: id },
    });

    if (!purchases) {
      throw new NotFoundException('Purchases not found');
    }

    const purchaseDtos: PurchaseDto[] = purchases.map((purchase) => ({
      id: purchase.id,
      userId: purchase.userId,
      offerId: purchase.offerId,
      quantity: purchase.quantity,
    }));

    return purchaseDtos;
  }

  async multiFindByUserOfferId(
    userId: string,
    offerIds: string[]
  ): Promise<PurchaseDto[] | null> {
    const purchases = await this.prismaService.purchase.findMany({
      where: { userId: userId, offerId: { in: offerIds } },
    });

    const purchasesDtos: PurchaseDto[] = purchases.map((p) => ({
      id: p.id,
      userId: p.userId,
      offerId: p.offerId,
      quantity: p.quantity,
    }));
    return purchasesDtos;
  }

  async findByUserOfferId(
    userId: string,
    offerId: string
  ): Promise<PurchaseDto | null> {
    const purchase = await this.prismaService.purchase.findUnique({
      where: { userId_offerId: { userId: userId, offerId: offerId } },
    });

    if (!purchase) {
      return null;
      // throw new NotFoundException('Purchase not found');
    }

    const purchaseDto: PurchaseDto = {
      id: purchase.id,
      userId: purchase.userId,
      offerId: purchase.offerId,
      quantity: purchase.quantity,
    };

    return purchaseDto;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
