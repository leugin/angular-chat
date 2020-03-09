import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {

  constructor( @InjectModel('User') private readonly userModel) {
  }

  async createUser(user: any): Promise<any> {
    const createdUser = new this.userModel(user);
    const takeUser = await createdUser.save();
    return takeUser;
  }

  async findAllUsers(): Promise<any[]> {
    return await this.userModel.find().exec();
  }

  async findOneUsers(username: string): Promise<any> {
    return await this.userModel.findOne({ 'username': username }).exec();
  }

  async findOneByUsername(username): Promise<any> {
    return await this.userModel.findOne({ 'username': username.username, 'password': username.password }).exec();
  }

  async updateUser(id: string, user: any): Promise<any> {
    return await this.userModel.findOneAndUpdate({ '_id': id }, user).exec();
  }

  async deleteUser(id: string): Promise<void> {
    return await this.userModel.findOneAndRemove({ '_id': id }).exec();
  }

}
