import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';

const blockUserByAdmin = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found !');
  }

  if (user.role === 'admin') {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you can not block admin ..');
  }

  if (user.isBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'user al ready block ');
  }
  if (!user.isBlocked) {
    throw new AppError(httpStatus.NOT_FOUND, 'user al ready block ');
  }

  user.isBlocked = true;
  const result = await user.save();

  return result;
};

 const getAllUserFromDb = async () => {

  const result = await User.find()

  return result;
};




export const userServices = {
    blockUserByAdmin,
    getAllUserFromDb
};
