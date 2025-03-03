
import express from 'express'
import { RentalRequestControllers } from './rentalRequest.controller';


const router =express.Router()

// api ai route here 

// router.post('/create-product',StudentControllers.createStudent);
router.post('/requests', RentalRequestControllers.createRentalRequest);
// router.get('/listings',RentalHouseControllers.getAllRentalHouse);
// router.get('/listings/:id',RentalHouseControllers.getHouseById);
// router.put('/listings/:id',RentalHouseControllers.updatedHouseById);
// router.delete('/listings/:id', RentalHouseControllers.deletedRentalHouseById);



export const RentalRequestRoutes= router;