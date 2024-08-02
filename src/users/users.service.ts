import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_scrypt);
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    public readonly UsersRepo: Repository<UsersEntity>,
  ) {}
  // Method to add new User into the data  base (Sign up with hashing  the password)
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
      //TODO hash password before saving it into the data base (Done)
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
  //Method to log in
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
  //Method to  get all users
  async getUsers(): Promise<UsersEntity[]> {
    try {
      const users = await this.UsersRepo.find();

      if (!users || users.length === 0) {
        console.log('Error getting users from the data base');
        throw new NotFoundException('Users Not found please try agine !');
      } else return users;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error  In the server!');
    }
  }

  //Check if the user is an admin
  isAdmin(userId: number) {
    const id = userId;
    const foundUser = this.UsersRepo.findOne({ where: { id } });
    if (!foundUser) {
      // throw new InternalServerErrorException("User Dosn't exist !");
      return false;
    }
    return true;
  }
  //Search user by id

  async findbyId(id: number): Promise<UsersEntity> {
    const user = await this.UsersRepo.findOne({ where: { id } });
    if (!user) {
      console.log('user not  found ');
      throw new NotFoundException('user not found !!');
    } else return user;
  }
  //Add new Admin

  async setAdmin(id: number): Promise<UsersEntity> {
    const user = await this.findbyId(id);
    if (!user) {
      console.log('user donst exist');
      throw new NotFoundException('user dosnt ezist .');
    } else {
      user.isAdmin = true;
      return this.UsersRepo.save(user);
    }
  }
}
