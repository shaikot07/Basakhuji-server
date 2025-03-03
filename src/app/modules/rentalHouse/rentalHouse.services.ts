/* eslint-disable @typescript-eslint/no-explicit-any */

import QueryBuilder from "../../builder/QueryBuilder";
import { RentalRequestModel } from "../RentalRequests/rentalRequest.model";
import { ProductSearchableFields } from "./rentalHouse.constant";
import { IRentalHouse } from "./rentalHouse.interface";
import { rentalHouseModel } from "./rentalHouse.model";

/** 🏠 Add a new rental house in the DB */
const createRentalHouseToDB = async (rentalHouse: IRentalHouse) => {
    const result = await  rentalHouseModel.create(rentalHouse);
    return result;
  };

  /** 🏠 Get all rental  house from DB */
  const getAllRentalHouse = async (query: Record<string, unknown>) => {
    console.log('amiquery',query);
    const rentalHouseQuery = new QueryBuilder(
      rentalHouseModel.find(),
      query,
    )
      .search(ProductSearchableFields)
      .filter()
      .sort()
      .fields()
      .paginate()
  
    const result = await  rentalHouseQuery.modelQuery.exec();
    // const meta = await productQuery.countTotal();
    console.log('Query Result:', result);
  
    return  result

  };

  /** 🏠 Get rental house by ID */
  const getRentalHouseById = async (id: string) => {
    console.log('ami id',id);
    const result = await rentalHouseModel.findById(id);
  
    return result;
  };
/** 🏠 updated rental house by ID */
  const updatedRentalHouseById = async (id: string, rentalHouseData: Partial<IRentalHouse>) => {
    const result = await rentalHouseModel.findByIdAndUpdate(id, rentalHouseData, {
      new: true,
    });
    return result;
  };


  const deletedRentalHouse = async (id: string) => {
    const result = await rentalHouseModel.findByIdAndDelete(id);
    return result;
  };
  

  const updateRentalRequestStatus = async (requestId: string, status: "approved" | "rejected", landlordPhoneNumber?: string) => {
    const updateData: any = { status };
    if (status === "approved" && landlordPhoneNumber) {
        updateData.landlordPhoneNumber = landlordPhoneNumber;
    }

    const result = await RentalRequestModel.findByIdAndUpdate(requestId, updateData, { new: true });
    return result;
};

// const updatePaymentStatus = async (requestId: string, paymentStatus: "pending" | "paid") => {
//     const result = await RentalRequestModel.findByIdAndUpdate(requestId, { paymentStatus }, { new: true });
//     return result;
// };



  export const RentalHouseServices = {
    createRentalHouseToDB,
    getAllRentalHouse,
    getRentalHouseById,
    updatedRentalHouseById,
    deletedRentalHouse,

    // for the rental request handle by the landlord
    updateRentalRequestStatus,
  };