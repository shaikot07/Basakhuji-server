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







export const RentalRequestServices = {
  
    createRentalRequestToDB,
    getRentalRequestsByTenant
  };