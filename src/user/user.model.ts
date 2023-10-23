// user.model.ts

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsEmail,
  IsString,
  Length,
  Matches,
  IsNotEmpty,
} from 'class-validator';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty()
  email: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Prop({ required: true })
  @IsNotEmpty()
  @Length(8, 255, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least 1 letter, 1 number, and 1 special character',
  })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
