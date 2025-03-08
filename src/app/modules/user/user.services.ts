import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { TUser } from './user.interface';

const blockUserByAdmin = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found !');
  }

  if (user.role === 'admin') {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you can not block admin ');
  }

  // if (user.isBlocked) {
  //   throw new AppError(httpStatus.NOT_FOUND, 'user al ready block ');
  // }

  user.isBlocked = !user.isBlocked;
  const result = await user.save();

  return result;
};

 const getAllUserFromDb = async () => {

  const result = await User.find()

  return result;
};

/** 🏠 updated user role by ID */
const updatedUserRoleById = async (id: string, role: string): Promise<TUser | null> => {
  const result = await User.findByIdAndUpdate(id, { role }, { new: true });
  return result;
};


export const userServices = {
    blockUserByAdmin,
    getAllUserFromDb,
    updatedUserRoleById
};
