/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {Twilio} from 'twilio';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private transporter;
  private twilioClient;

  constructor(private configService: ConfigService) {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    const emailUser = this.configService.get<string>('EMAIL_USER');
    const emailPass = this.configService.get<string>('EMAIL_PASS');

    if (!accountSid || !authToken || !emailUser || !emailPass) {
      throw new Error('Twilio or email credentials are missing');
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendEmail(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: `"Adelux" <${this.configService.get<string>('EMAIL_USER')}>`,
      to,
      subject,
      html,
    });
  }

  async sendSms(to: string, message: string) {
    const from = this.configService.get<string>('TWILIO_PHONE_NUMBER');
    return this.twilioClient.messages.create({
      body: message,
      from,
      to,
    });
  }
}
