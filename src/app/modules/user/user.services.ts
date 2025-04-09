import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { TUser } from './user.interface';
import mongoose from 'mongoose';

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
const updatedUserRoleById = async (userId: string, updatedRoll: { role: string }): Promise<TUser | null> => {
  console.log("🔹 Received userId:", userId, "Type:", typeof userId);
  console.log("🔹 Received updatedRoll:", updatedRoll);

  const { role } = updatedRoll; // Extract the role properly

  //  `findByIdAndUpdate` to update the role
  const result = await User.findByIdAndUpdate(
    userId,
    { role }, // Pass the extracted role
    { new: true, runValidators: true } // Return updated user and enforce validation
  );

  if (!result) {
    console.error("❌ User not found with ID:", userId);
    throw new Error("User not found");
  }

  console.log("✅ Updated User:", result);
  return result;
};


const updatedUserPersonalInfoById= async (userId: string, updatedUserData: { name: string; email: string; phone: string }): Promise<TUser | null> => {

  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found !');
  }
 const result = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    return result;

}

export const userServices = {
    blockUserByAdmin,
    getAllUserFromDb,
    updatedUserRoleById,
    updatedUserPersonalInfoById
};
