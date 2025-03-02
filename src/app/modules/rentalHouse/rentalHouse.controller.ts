import { NextFunction, Request, Response } from "express";
import { RentalHouseServices } from "./rentalHouse.services";



const createRentalHouse = async ( req: Request, res: Response,next: NextFunction,) => {
    try {
      const rentalHouse = req.body;
      console.log("this is the contro",rentalHouse);
      const result = await RentalHouseServices.createRentalHouseToDB(rentalHouse);
      res.status(200).json({
        success: true,
        message: 'bike is created successfully',
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





  export const RentalHouseControllers = {
    createRentalHouse
  };