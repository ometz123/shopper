import { Inject, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Offer } from './entities/offer.entity';
import { OfferDto } from './dto/offer.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OffersService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(ConfigService) private readonly config: ConfigService
  ) {}

  async create(createOfferDto: CreateOfferDto): Promise<OfferDto> {
    const newOffer = await this.prismaService.offer.create({
      data: {
        title: createOfferDto.title,
        price: createOfferDto.price,
        limitPerUser: createOfferDto.limitPerUser,
        imageURL: createOfferDto.imageURL,
      },
    });

    return {
      id: newOffer.id,
      title: newOffer.title,
      price: newOffer.price,
      limitPerUser: newOffer.limitPerUser,
      imageUrl: newOffer.imageURL,
    };
  }

  async findAll() {
    const allOffers = await this.prismaService.offer.findMany();
    const modifiedOffers: OfferDto[] = allOffers.map((o) => ({
      id: o.id,
      title: o.title,
      price: o.price,
      limitPerUser: o.limitPerUser,
      imageUrl: `${this.config.get('CATS_IMAGES_PROVIDER')}/${o.imageURL}`,
    }));

    return modifiedOffers;
  }

  findOne(id: number) {
    return `This action returns a #${id} offer`;
  }

  update(id: number, updateOfferDto: UpdateOfferDto) {
    return `This action updates a #${id} offer`;
  }

  remove(id: number) {
    return `This action removes a #${id} offer`;
  }
}
