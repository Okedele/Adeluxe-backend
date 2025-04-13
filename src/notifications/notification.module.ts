// src/notifications/notifications.module.ts
import { Module } from '@nestjs/common';
import { NotificationsService } from './notification.service'; 

@Module({
  providers: [NotificationsService],
  exports: [NotificationsService], // 👈 important to export it
})
export class NotificationsModule {}
