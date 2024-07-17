import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/newUser')
  addUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('wilaya') wilaya: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    // Call the service method to add a new user
    return this.usersService.addNew(
      firstName,
      lastName,
      phoneNumber,
      wilaya,
      email,
      password,
    );
  }
}
