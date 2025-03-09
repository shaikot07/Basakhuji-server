import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { userServices } from './user.services';
import AppError from '../../errors/AppError';

const blockUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  await userServices.blockUserByAdmin(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully!',
    data: '',
  });
});

const getAllUser= catchAsync(async (req: Request, res: Response) => {
 
  const result= await userServices.getAllUserFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User  retrieved  successfully!',
    data:result,
  });
});

const updatedRollById = catchAsync(async (req: Request, res: Response, ) => {
   
  const { userId } = req.params;
  console.log('user is for updated',  userId);
  const updatedRoll = req.body;
  console.log('re.body', updatedRoll);
  if (!userId) {
    throw new Error("User ID is missing from request");
  }
  const userRoll = await userServices.updatedUserRoleById(
    userId,
    updatedRoll,
  )


  if (!userRoll) {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found');
  }

  // Send successful response if product is found
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user roll updated successfully',
    data:userRoll,  
  });
});


export const userController = {
  blockUser,
  getAllUser,
  updatedRollById 
};
