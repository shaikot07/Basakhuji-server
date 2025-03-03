import { IRentalRequest } from "./rentalRequest.interface";
import { RentalRequestModel } from "./rentalRequest.model";


const createRentalRequestToDB = async (rentalRequest: IRentalRequest) => {
    const result = await RentalRequestModel.create(rentalRequest);
    return result;
};



// const getRentalRequestsByTenant = async (tenantId: string) => {
//     const result = await RentalRequestModel.find({ tenantId }).populate("rentalHouseId");
//     return result;
// };

// const updateRentalRequestStatus = async (requestId: string, status: "approved" | "rejected", landlordPhoneNumber?: string) => {
//     const updateData: any = { status };
//     if (status === "approved" && landlordPhoneNumber) {
//         updateData.landlordPhoneNumber = landlordPhoneNumber;
//     }

//     const result = await RentalRequestModel.findByIdAndUpdate(requestId, updateData, { new: true });
//     return result;
// };

// const updatePaymentStatus = async (requestId: string, paymentStatus: "pending" | "paid") => {
//     const result = await RentalRequestModel.findByIdAndUpdate(requestId, { paymentStatus }, { new: true });
//     return result;
// };





export const RentalRequestServices = {
  
    createRentalRequestToDB,
  };