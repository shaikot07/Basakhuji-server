import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { RentalRequestServices } from "./rentalRequest.services";
import { Request, Response } from "express";



const createRentalRequest = catchAsync(async (req: Request, res: Response) => {
    const rentalRequest = req.body;

    const result = await  RentalRequestServices.createRentalRequestToDB( rentalRequest);

    sendResponse(res, {
       statusCode: httpStatus.OK,
        success: true,
        message: "Rental request submitted successfully",
        data: result,
    });
});


// get all rental requests by a specific tenant
const getRentalRequest = catchAsync(async (req: Request, res: Response) => {
    const tenantId = req.params.id;
    const result = await RentalRequestServices.getRentalRequestsByTenant(tenantId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Rental requests retrieved successfully",
        data: result,
    });
});



export const RentalRequestControllers = {
createRentalRequest,
getRentalRequest
  };