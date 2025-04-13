/* eslint-disable prettier/prettier */
// src/types/express.d.ts

import { Request } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    email?: string;
  };
}
