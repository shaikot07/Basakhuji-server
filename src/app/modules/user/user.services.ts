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


import mongoose from "mongoose";

const updatedUserRoleById = async (userId: string, updatedRoll: { role: string }): Promise<TUser | null> => {
  console.log("🔹 Received userId:", userId, "Type:", typeof userId);
  console.log("🔹 Received updatedRoll:", updatedRoll);

  // ✅ Check if userId is a valid MongoDB ObjectId
  // if (!mongoose.Types.ObjectId.isValid(userId)) {
  //   console.error("❌ Invalid MongoDB ID:", userId);
  //   throw new Error("Invalid ID format");
  // }

  // ✅ Destructure the role from the object
  const { role } = updatedRoll; // Extract the role properly

  // ✅ Use `findByIdAndUpdate` to update the role
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



export const userServices = {
    blockUserByAdmin,
    getAllUserFromDb,
    updatedUserRoleById
};
