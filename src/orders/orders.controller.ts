/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createOrder(
    @Body() body: { items: { name: string; image: string; price: number; quantity: number; }[] },
    @Request() req
  ) { const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
  
    return this.ordersService.create(userId, body.items);
  }
  

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getOrders(@Request() req) {
    const userId = req.user.id;
    const orders = await this.ordersService.findByUser(userId);
    return orders.map((order) => ({
      id: order.id,
      createdAt: order.createdAt,
      items: order.items.map((item) => ({
        name: item.name,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
      })),
    }));
  }
}
