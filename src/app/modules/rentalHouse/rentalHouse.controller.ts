import { NextFunction, Request, Response } from "express";
import { RentalHouseServices } from "./rentalHouse.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";



const createRentalHouse = async ( req: Request, res: Response,next: NextFunction,) => {
    try {
      const rentalHouse = req.body;
      console.log("this is the contro",rentalHouse);
      const result = await RentalHouseServices.createRentalHouseToDB(rentalHouse);
      res.status(200).json({
        success: true,
        message: 'Rental house created successfully',
        data: result,
      });
    } catch (error) {
      // res.status(400).json({
      //   message: 'failed to create bike',
      //   success: false,
      //   error: err,
      // });
      next(error);
    }
  };


  const getAllRentalHouse  = catchAsync(async (req: Request,res: Response, ) => {
    console.log('ami controller',req.query);
    const result = await RentalHouseServices.getAllRentalHouse(req.query)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rental house  are retrieved successfully',
      data: result,
    });
  });


  const getHouseById = catchAsync(async (req: Request, res: Response, ) => {
   
    const houseId = req.params.id;
    console.log(houseId);
    const rentalHouse = await RentalHouseServices.getRentalHouseById(houseId);
  
    // iuf product is not found, return 404 error
    if (! rentalHouse) {
      throw new AppError(httpStatus.NOT_FOUND, 'This rental house is not found !');
    }
  
    // Send successful response if product is found
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rental house retrieved successfully',
      data:rentalHouse,  // Ensure we return the correct 'product' (house)
    });
  });
  




  export const RentalHouseControllers = {
    createRentalHouse,
    getAllRentalHouse ,
    getHouseById ,
  };