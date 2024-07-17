import { Repository } from 'typeorm';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';   

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    public readonly UsersRepo: Repository<UsersEntity>,
  ) {}

  // This method is to check if a user already exists in the database by email
  async findByEmail(email: string): Promise<UsersEntity> {
    const foundUser = await this.UsersRepo.findOne({ where: { email } });
    if (!foundUser) {
      throw new NotFoundException('Email not found');
    }
    return foundUser;
  }

  // Add new User
  async addNew(
    firstName: string,
    lastName: string,
    phoneNumber: string,
    wilaya: string,
    email: string,
    password: string,
  ): Promise<UsersEntity> {
    // Check if email is already in use
    const userExists = await this.UsersRepo.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException('Email is already in use');
    }
    //TODO hash password before saving it into the data base

    const newUser = this.UsersRepo.create({
      firstName,
      lastName,
      phoneNumber,
      wilaya,
      email,
      password,
    });

    try {
      return await this.UsersRepo.save(newUser);
    } catch (error) {
      console.error('Error saving new user:', error);
      throw new InternalServerErrorException('Error creating new user');
    }
  }
}
