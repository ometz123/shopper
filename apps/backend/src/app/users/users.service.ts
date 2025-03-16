import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './entities/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.prismaService.user.create({
      data: createUserDto,
    });
    const userDto: UserDto = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
    return userDto;
  }

  async findAll() {
    const allUsers = await this.prismaService.user.findMany();
    return allUsers;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
