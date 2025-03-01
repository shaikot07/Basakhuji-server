/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  phone?: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'customer' | 'landlord' | 'tenant';
  isBlocked: boolean;
  isDeleted: boolean;
  passwordChangedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  profileImg?: string;
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsById(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
export type TUserRole = keyof typeof USER_ROLE;
