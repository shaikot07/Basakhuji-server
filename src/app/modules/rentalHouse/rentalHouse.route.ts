
import express from 'express'
import { RentalHouseControllers } from './rentalHouse.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router =express.Router()

// api ai route here 

// router.post('/create-product',StudentControllers.createStudent);
router.post('/listings', RentalHouseControllers.createRentalHouse);
router.get('/listings',RentalHouseControllers.getAllRentalHouse);
router.get('/listings/:id',RentalHouseControllers.getHouseById);
router.put('/listings/:id',RentalHouseControllers.updatedHouseById);
router.delete('/listings/:id', RentalHouseControllers.deletedRentalHouseById);
// -------- for handle request ----------------
// update rental request status (approve or reject and add landlord phone number phone number patabe  client side theke)
router.put('/requests/:id',auth(USER_ROLE.landlord), RentalHouseControllers.updateRequestStatus);



export const RentalHouseRoutes= router;