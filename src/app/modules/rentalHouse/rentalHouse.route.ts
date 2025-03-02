
import express from 'express'
import { RentalHouseControllers } from './rentalHouse.controller';
const router =express.Router()

// api ai route here 

// router.post('/create-product',StudentControllers.createStudent);
router.post('/listings', RentalHouseControllers.createRentalHouse);
router.get('/listings',RentalHouseControllers.getAllRentalHouse);
router.get('/listings/:id',RentalHouseControllers.getHouseById);
router.put('/listings/:id',RentalHouseControllers.updatedHouseById);
// router.delete('/:id', ProductControllers.deleteProduct);



export const RentalHouseRoutes= router;