import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      Logger.log('connected to mongo');
    } catch (e) {
      Logger.error('failed to connect to mongo', e);
      throw e;
    }
  }
}
