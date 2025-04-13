/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract the token from Authorization header
      ignoreExpiration: false, 
      secretOrKey: process.env.JWT_SECRET,
    });
  }

 
  async validate(payload) {
    // The payload contains the user data decoded from the JWT
    const user = await this.authService.validateUser(payload.sub); // Assuming 'sub' is the user ID
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return { id: user.id }; // Attach user ID to the request
  }
}
