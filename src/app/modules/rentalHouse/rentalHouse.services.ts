/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
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
  
  // ------------------------------

  const updateRentalRequestStatus = async (
    requestId: string,
    status: "approved" | "rejected",
    landlordPhoneNumber?: string,
    landlordId?: string // 🔹 Get landlordId from authenticated user
) => {
    // console.log("🔍 Received request to update ID:", requestId);
    // console.log("🔍 Status to update:", status);
    // console.log("🔍 Landlord ID:", landlordId);

    // 1️⃣ Find the rental request first
    const rentalRequest = await RentalRequestModel.findById(requestId).populate<{ rentalHouseId: IRentalHouse }>("rentalHouseId");
    if (!rentalRequest) {
      
        throw new AppError(
          httpStatus.NOT_FOUND, `${ landlordId} Rental request not found!`,
        );
    }

    console.log("🔍 Found rental request:", rentalRequest);

    // 2️⃣ Check if the landlord is the owner of the rental house
    if (!rentalRequest.rentalHouseId || rentalRequest.rentalHouseId.landlordId.toString() !== landlordId) {
        throw new AppError(
          httpStatus.UNAUTHORIZED, `${ landlordId} You are not authorized to update this request.`,
        );
    }

    // 3️⃣ Prepare update data
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