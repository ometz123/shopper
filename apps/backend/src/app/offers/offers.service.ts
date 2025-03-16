import { Inject, Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OffersService {
  constructor( @Inject(PrismaService)private readonly prismaService: PrismaService) {
  }
  create(createOfferDto: CreateOfferDto) {
    return 'This action adds a new offer';
  }

  async findAll() {
    const allOffers=await this.prismaService.offer.findMany();
    return allOffers;
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
