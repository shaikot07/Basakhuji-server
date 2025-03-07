/* eslint-disable @typescript-eslint/no-explicit-any */
// import httpStatus from "http-status";
// import AppError from "../../errors/AppError";
// import { IRentalHouse } from "../rentalHouse/rentalHouse.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IRentalHouse } from "../rentalHouse/rentalHouse.interface";
import { IRentalRequest } from "./rentalRequest.interface";
import { RentalRequestModel } from "./rentalRequest.model";


const createRentalRequestToDB = async (rentalRequest: IRentalRequest) => {
    const result = await RentalRequestModel.create(rentalRequest);
    return result;
};



const getRentalRequestsByTenant = async (tenantId: string) => {
    const result = await RentalRequestModel.find({ tenantId }).populate("rentalHouseId");
    return result;
};


const getRentalRequestsByLandlord = async (landlordId: string) => {
    const result = await RentalRequestModel.find()
        .populate({
            path: "rentalHouseId",
            match: { landlordId }, // ✅ Only fetch properties owned by the landlord
        });

    // Remove requests where rentalHouseId is null (since match might exclude some)
    return result.filter(request => request.rentalHouseId !== null);
}




const updatedRentalRequestStatusByLanload = async (requestId: string,status: "approved" | "rejected", landlordPhoneNumber?: string, landlordId?: string 
) => {
    console.log("request to update ID from services:", requestId);
    console.log("to update:  from services", status);
    console.log("  from services", landlordId);

    // find the rental request first
    const rentalRequest = await RentalRequestModel.findById(requestId).populate<{ rentalHouseId: IRentalHouse }>("rentalHouseId");
    if (!rentalRequest) {
      
        throw new AppError(
          httpStatus.NOT_FOUND,`${ landlordId} Rental request not found!` ,
        );
    }

    console.log(" Found rental request:", rentalRequest);

    //  Check if the landlord is the owner of the rental house
    if (!rentalRequest.rentalHouseId || rentalRequest.rentalHouseId?.landlordId?.toString() !== landlordId) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,` ${ landlordId} You are not authorized to update this request.`,
        );
    }

    // Prepare update data
    const updateData: any = { status };
    if (status === "approved" && landlordPhoneNumber) {
        updateData.landlordPhoneNumber = landlordPhoneNumber;
    }

    console.log("🔍 Data to be updated:", updateData);

    // 4️⃣ Perform the update
    const result = await RentalRequestModel.findByIdAndUpdate(requestId, updateData, {
        new: true,
        runValidators: true,
    });

    console.log("✅ Update result:", result);

    return result;
};





export const RentalRequestServices = {
  
    createRentalRequestToDB,
    getRentalRequestsByTenant,
    getRentalRequestsByLandlord,
    updatedRentalRequestStatusByLanload // 🔹 Export the new method
    
  };