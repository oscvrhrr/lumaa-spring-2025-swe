import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(
    username: string,
    pass: string,
  ): Promise<Omit<Users, 'password'> | void> {
    try {
      const hash = await bcrypt.hash(pass, 10);
      const user = await this.prisma.users.create({
        data: {
          username,
          password: hash,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...newuser } = user;
      return newuser;
    } catch (err) {
      console.log(err);
      return console.log('username already exists');
    }
  }

  async findOne(username: string): Promise<Users | undefined> {
    const user = await this.prisma.users.findFirst({
      where: {
        username,
      },
    });
    return user || undefined;
  }
}
