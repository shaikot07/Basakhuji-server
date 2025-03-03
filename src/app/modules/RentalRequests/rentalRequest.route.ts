
import express from 'express'
import { RentalRequestControllers } from './rentalRequest.controller';



const router =express.Router()

// api ai route here 

// router.post('/create-product',StudentControllers.createStudent);
router.post('/requests', RentalRequestControllers.createRentalRequest);
// router.get('/requests',RentalHouseControllers.getAllRentalHouse);
router.get('/requests/:id', RentalRequestControllers.getRentalRequest);
// router.put('/requests/:id',RentalHouseControllers.updatedHouseById);
// router.delete('/requests/:id', RentalHouseControllers.deletedRentalHouseById);
// -----------------------------------


export const RentalRequestRoutes= router;