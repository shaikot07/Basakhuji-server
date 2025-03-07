import { NextFunction, Request, Response } from "express";
import { RentalHouseServices } from "./rentalHouse.services";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";



const createRentalHouse = async ( req: Request, res: Response,next: NextFunction,) => {
    try {
      const rentalHouse = req.body;
      console.log('Received data:', rentalHouse);
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

  // get all rental house by landlord id
  const getLanloadWonRentalRequest = catchAsync(async (req: Request, res: Response) => {
    const requestId =  req.params.id;
    console.log('re',requestId,'params');
    const landlordId = req.user.userId;
    console.log('lanload', landlordId,'user');
    const result = await RentalHouseServices.getLandlordWonRentalHouses( requestId, landlordId,);


    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "lanload won house retrieved successfully",
        data: result,
    });
});


  const getHouseById = catchAsync(async (req: Request, res: Response, ) => {
   
    const houseId = req.params.id;
    console.log(houseId);
    const rentalHouse = await RentalHouseServices.getRentalHouseById(houseId);
  
    // iuf house is not found, return 404 error
    if (! rentalHouse) {
      throw new AppError(httpStatus.NOT_FOUND, 'This rental house is not found !');
    }
  
    // Send successful response if house is found
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rental house retrieved successfully',
      data:rentalHouse,  // Ensure we return the correct  (house)
    });
  });

  // for updated rental house by ID
  const updatedHouseById = catchAsync(async (req: Request, res: Response, ) => {
   
    const houseId = req.params.id;
    console.log(houseId);
    const rentalHouseData = req.body;
    const rentalHouse = await RentalHouseServices.updatedRentalHouseById(
      houseId,
      rentalHouseData,
    )
  
    // iuf rentalhouse is not found, return 404 error
    if (! rentalHouse) {
      throw new AppError(httpStatus.NOT_FOUND, 'This rental house is not found !');
    }
  
    // Send successful response if product is found
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rental house info updated successfully',
      data:rentalHouse,  // Ensure we return the correct 'product' (house)
    });
  });
  
  const deletedRentalHouseById = catchAsync(async (req: Request, res: Response) => {
    const houseId = req.params.id;
  
    // Call the service method to delete the rental house by its ID
    const deletedHouse = await RentalHouseServices.deletedRentalHouse(houseId);
  
    if (!deletedHouse) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Rental house not found',
        data: null,
      });
    }
  
    // If successful, return a success response
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Rental house deleted successfully!',
      data: null,  // No data to return since it's a delete operation
    });
  });


  export const RentalHouseControllers = {
    createRentalHouse,
    getAllRentalHouse ,
    getLanloadWonRentalRequest,
    getHouseById ,
    updatedHouseById,
    deletedRentalHouseById,
 
  };