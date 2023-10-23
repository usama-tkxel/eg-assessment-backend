import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { pick } from 'lodash';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/user/user.model';
import { ConfigService } from '@nestjs/config';
import { AuthDto, CreateUser } from './dto';

const SALT_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signUp(dto: CreateUser) {
    const { email, password, firstName, lastName } = dto;
    try {
      const existingUser = await this.userModel.findOne({ email }).exec();

      if (existingUser) {
        throw new BadRequestException('User Already Exists');
      }
      const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
      const user = new this.userModel({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });
      await user.save();
      const response = pick(user, ['email', 'firstName', 'lastName']);
      const token = this.generateJwtToken(user);
      return { ...response, token };
    } catch (error) {
      throw error;
    }
  }

  async signIn(dto: AuthDto) {
    const { email, password } = dto;
    if (!email) {
      throw new UnauthorizedException('Email is required');
    }
    const user = await this.userModel.findOne({ email }).exec();

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const response = pick(user, ['email', 'firstName', 'lastName']);
      const token = this.generateJwtToken(user); // Generate JWT token
      return { ...response, token };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  generateJwtToken(user: User) {
    const payload = { sub: user.id, email: user.email };
    const secret = this.config.get('JWT_SECRET');
    return this.jwtService.sign(payload, { expiresIn: '10m', secret });
  }
}
