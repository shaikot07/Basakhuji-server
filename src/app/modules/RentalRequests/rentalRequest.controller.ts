import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { Request, Response } from "express";
import { RentalRequestServices } from "./rentalRequest.services";




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

const getRentalRequestsForLandlord = catchAsync(async (req: Request, res: Response) => {
    const landlordId = req.user.userId;  // ✅ Get landlord ID from authenticated user
    const  result = await RentalRequestServices.getRentalRequestsByLandlord(landlordId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Rental requests for Landlord Won have been successfully retrieved.",
        data: result,
    });
});
// -------------------- !Lanlod request approval handling--------------------------
// update rental request status (approve or reject and add landlord phone number phone number patabe  client side theke)


const updateRequestStatus = catchAsync(async (req: Request, res: Response) => {
    // console.log("checkuser", req.user.userId);
    const requestId = req.params.id;
    const { status, landlordPhoneNumber } = req.body;
    const landlordId = req.user.userId;

    // console.log(" authenticated Landlord ID:", landlordId);

    const result = await RentalRequestServices.updatedRentalRequestStatusByLanload(requestId, status, landlordPhoneNumber, landlordId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Rental request ${status} successfully test`,
        data: result,
    });
});

export const RentalRequestControllers = {
createRentalRequest,
getRentalRequest,
getRentalRequestsForLandlord,
updateRequestStatus

  };