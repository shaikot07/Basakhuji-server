
import QueryBuilder from "../../builder/QueryBuilder";
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














  export const RentalHouseServices = {
    createRentalHouseToDB,
    getAllRentalHouse
  };