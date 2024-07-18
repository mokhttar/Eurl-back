import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  Redirect,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Session } from 'inspector';

const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    public readonly UsersRepo: Repository<UsersEntity>,
  ) {}

  // Add new User
  async addNew(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    wilaya: string,
    email: string,
    password: string,
  ): Promise<UsersEntity> {
    try {
      // Check if email is already in use
      const userExists = await this.UsersRepo.findOne({ where: { email } });
      if (userExists) {
        throw new ConflictException('Email is already in use');
      }
      //Check the phone number
      const phoneNumberExist = await this.UsersRepo.findOne({
        where: { phoneNumber },
      });
      if (phoneNumberExist) {
        throw new ConflictException('Phone is alredy in use');
      }
      //TODO hash password before saving it into the data base

      //Generate salt
      const salt = randomBytes(8).toString('hex');
      //hash password
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      //join hash and the salt
      const newPassword = salt + '.' + hash.toString('hex');
      //save into the data base
      password = newPassword;
      const newUser = this.UsersRepo.create({
        firstName,
        lastName,
        phoneNumber,
        wilaya,
        email,
        password,
      });

      return await this.UsersRepo.save(newUser);
    } catch (error) {
      console.error('Error saving new user:', error);
      throw new InternalServerErrorException('Error creating new user');
    }
  }
  async Login(email: string, password: string) {
    //get the email from the data base
    try {
      const foundUser = await this.UsersRepo.findOne({ where: { email } });
      if (!foundUser) {
        throw new NotFoundException('User not found please create an account ');
      }
      //extract the password and calculate  find the salt(client part)
      const dbPassword = foundUser.password;
      //extract the salt
      const [salt, hashDB] = dbPassword.split('.');
      //(create user client  hashed password)
      const hashClient = (await scrypt(password, salt, 32)) as Buffer;
      const passwordClient = salt + '.' + hashClient.toString('hex');
      if (dbPassword === passwordClient) {
        return foundUser;
      } else {
        throw new NotFoundException('Password is wrong please try agine !');
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw new InternalServerErrorException('Error during login');
    }
  }
}
