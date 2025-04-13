import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsModule } from 'src/notifications/notification.module';

@Module({
  imports: [NotificationsModule],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
})
export class OrdersModule {}

// This module is responsible for handling orders in the application.
