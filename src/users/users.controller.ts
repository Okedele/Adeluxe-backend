/* eslint-disable prettier/prettier */
import { Body, Controller, UseGuards, Delete, Get, Param, Patch, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RequestWithUser } from 'src/types/express'; // Importing Request from express

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me') 
  getProfile(@Request() req: RequestWithUser) {
    console.log('User in request:', req.user);
    return this.usersService.findById(req.user.id); 
  }
  


  @Get(':id') // Retrieve user by ID
  findOne(@Param('id') id: string) {
    return this.usersService.findById(Number(id)); // Ensure id is converted to a number
  }

  @Post() // Create a new user (assuming this is for admin use)
  create(@Body() user: { email: string; password: string }) {
    return this.usersService.create(user.email, user.password); // Use the service to create a user
  }

  @Patch(':id') // Update user by ID
  update(@Param('id') id: string, @Body() userUpdate: { email?: string; password?: string }) {
    return this.usersService.update(Number(id), userUpdate); // Convert id to number
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me') // Update the logged-in user's profile
  updateProfile(@Request() req: RequestWithUser, @Body() body: { email?: string; password?: string }) {
    return this.usersService.update(req.user.id, body); // Pass userId from the token
  }

  @Delete(':id') // Delete user by ID
  delete(@Param('id') id: string) {
    return this.usersService.delete(Number(id)); // Ensure id is converted to a number
  }
}
