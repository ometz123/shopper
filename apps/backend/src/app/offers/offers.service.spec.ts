import { Test, TestingModule } from '@nestjs/testing';
import { OffersService } from './offers.service';
import { Offer } from './entities/offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

describe('OffersService', () => {
  let service: OffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OffersService,PrismaService,ConfigService],
    }).compile();

    service = module.get<OffersService>(OffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate offers and insert to DB', async () => {
    const newOffers: CreateOfferDto[] = [];
    for (let i = 0; i < 20; i++) {
      const randomSeed = Math.random();
      newOffers.push({
        title: `Random cat ${i}`,
        price: Number((randomSeed * 100).toFixed(2)),
        limitPerUser: 10,
        imageURL: `${Math.floor(randomSeed * 200)}/${Math.floor(randomSeed * 300)}`,
      });
    }

    const offers = await Promise.all(newOffers.map(async (o) => service.create(o)));

    expect(offers).toBeDefined();
    expect(offers.length).toBeGreaterThan(0);
  });

  it('should get all offers from DB', async () => {
    const offers = await service.findAll();

    expect(offers).toBeDefined();
    expect(offers.length).toBeGreaterThan(0);
  });
});
