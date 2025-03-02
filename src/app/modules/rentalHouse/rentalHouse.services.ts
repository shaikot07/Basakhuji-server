
import { IRentalHouse } from "./rentalHouse.interface";
import { rentalHouseModel } from "./rentalHouse.model";

/** 🏠 Add a new rental listing */
const createRentalHouseToDB = async (rentalHouse: IRentalHouse) => {
    const result = await  rentalHouseModel.create(rentalHouse);
    return result;
  };
















  export const RentalHouseServices = {
    createRentalHouseToDB
  };