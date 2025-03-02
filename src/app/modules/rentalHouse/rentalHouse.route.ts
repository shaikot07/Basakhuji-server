
import express from 'express'
import { RentalHouseControllers } from './rentalHouse.controller';
const router =express.Router()

// api ai route here 

// router.post('/create-product',StudentControllers.createStudent);
router.post('/listings', RentalHouseControllers.createRentalHouse);
// router.get('/',ProductControllers.getAllProducts)
// router.get('/:id', ProductControllers.getProductById);
// router.put('/:id', ProductControllers.updatedVProduct);
// router.delete('/:id', ProductControllers.deleteProduct);



export const RentalHouseRoutes= router;