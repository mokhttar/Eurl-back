import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Request,
  Post,
} from '@nestjs/common';
import { CurrentUser } from './decorators/current-user-decorator';
// import  {Reque}
import { UsersService } from './users.service';
import { Session } from '@nestjs/common';
//NOTE EVERY TIME THE USER NEED SOMTHING  DONT SEND THE WHOLE USER OBJECT JUST SEND THE  SESSION_ID OF THE USER
//TODO implements logout  method for users
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('/newUser')
  async addUser(
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('phoneNumber') phoneNumber: string,
    @Body('wilaya') wilaya: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Session() Session: any,
  ) {
    const user = await this.usersService.addNew(
      firstName,
      lastName,
      phoneNumber,
      wilaya,
      email,
      password,
    );
    Session.userId = user.id;
    return user;
  }

  //TEST GUARD
  @Get('/test')
  IsLogedIn(@CurrentUser() response: any): boolean {
    return response;
  }

  @Post('/logIn')
  //the user wheen he first logIn he get the his userId and save in a cookie session  so next time we dont send all the data
  async logIn(
    @Body('email') email: string,
    @Body('password') password: string,
    @Session() session: any,
  ) {
    try {
      const foundUser = await this.usersService.Login(email, password);
      if (foundUser) {
        //create a Session for the  userId.
        session.userID = foundUser.id;
        // console.log(session.userID);
        return foundUser;
      } else {
        throw new NotFoundException(
          'user not found please check your informations!',
        );
      }
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('User not  found !!');
    }
  }

  //TODO  only for test
  @Post('/signout')
  singOut(@Request() req: any, @Session() session: any) {
    if (session) {
      session.userID = null;
      return session;
    } else return null;
  }
  @Get('/getAll')
  getAllUsers() {
    return this.usersService.getUsers();
  }
}
