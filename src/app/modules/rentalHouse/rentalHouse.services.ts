/* eslint-disable @typescript-eslint/no-explicit-any */

import mongoose from 'mongoose';
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";

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
    // console.log('Query Result:', result);
  
    return  result

  };
// ------------- lanload won house ----------------

const getLandlordWonRentalHouses = async (requestId: string, landlordId: string) => {

  // console.log("s-checkuser",landlordId);
  // console.log("s-request",requestId);

  if (landlordId !== requestId) {
    throw new AppError(httpStatus.FORBIDDEN, "Access denied: You are not authorized to view this data.");
  }

  const result = await rentalHouseModel.find({ landlordId });

  return result;
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
  
  // ------------------------------ for chart lanload side -------------------
  const  getLandlordPostedRentalHouseStats = async (landlordId: string) => {
    const stats = await rentalHouseModel.aggregate([
      { 
        $match: { 
          landlordId: new mongoose.Types.ObjectId(landlordId) 
        } 
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },  // Group by year
            month: { $month: "$createdAt" },  // Group by month
          },
          count: { $sum: 1 }  // Count number of documents in each month
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }, // Sort by year and month
      },
    ]);
  
    console.log("Aggregated stats by month:", stats);
    return stats;
  };

  // for chart lanload side
  const getTotalRentalPostsByLandlord = async (landlordId: string) => {
    // Fetch the total number of posts by the landlord
    const totalPosts = await rentalHouseModel.countDocuments({ landlordId: new mongoose.Types.ObjectId(landlordId) });
  
    console.log("Total posts:", totalPosts); // For debugging purposes
    return totalPosts;
  };

// const updatePaymentStatus = async (requestId: string, paymentStatus: "pending" | "paid") => {
//     const result = await RentalRequestModel.findByIdAndUpdate(requestId, { paymentStatus }, { new: true });
//     return result;
// };



  export const RentalHouseServices = {
    createRentalHouseToDB,
    getAllRentalHouse,
    getLandlordWonRentalHouses,
    getRentalHouseById,
    updatedRentalHouseById,
    deletedRentalHouse,
    getLandlordPostedRentalHouseStats,
    getTotalRentalPostsByLandlord

  
  };