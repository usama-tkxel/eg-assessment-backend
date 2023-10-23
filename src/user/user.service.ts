// import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';

// import { User } from 'src/user/user.model';

// const SALT_ROUNDS = 10;

// @Injectable()
// export class UserService {
//   constructor(
//     @InjectModel(User.name) private readonly userModel: Model<User>,
//   ) {}
//   async createUser(
//     email: string,
//     password: string,
//     firstName: string,
//     lastName: string,
//   ): Promise<User> {
//     const existingUser = await this.userModel.findOne({ email }).exec();

//     if (existingUser) {
//       throw new BadRequestException('User Already Exists');
//     }
//     const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
//     const user = new this.userModel({
//       email,
//       firstName,
//       lastName,
//       password: hashedPassword,
//     });
//     return await user.save();
//   }

//   async getUser(username: string, password: string): Promise<User> {
//     return this.userModel.findOne({ username, password }).exec();
//   }
// }
