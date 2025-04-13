/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(userId: number) {
    if (!userId) {
      throw new Error('UserId is required');
    }
    console.log('UserId received:', userId);
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
  
  
  async delete(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
  

  async update(id: number, data: { email?: string; password?: string }) {
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword; // Hash the new password if provided
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
