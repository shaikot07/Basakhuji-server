
import express from 'express'
import { RentalHouseControllers } from './rentalHouse.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { RentalRequestControllers } from '../RentalRequests/rentalRequest.controller';

const router =express.Router()

// api ai route here 

// router.post('/create-product',StudentControllers.createStudent);
router.get('/getAll',RentalHouseControllers.getAllRentalHouse);
router.get('/listings/:id',RentalHouseControllers.getHouseById);
router.post('/listings', RentalHouseControllers.createRentalHouse);
router.put('/listings/:id',RentalHouseControllers.updatedHouseById);
router.delete('/listings/:id', RentalHouseControllers.deletedRentalHouseById);
// Landlord-specific rental requests
router.get('/listings/won/:id',auth(USER_ROLE.landlord), RentalHouseControllers.getLanloadWonRentalRequest);

// -------- for handle request ----------------
// update rental request status (approve or reject and add landlord phone number phone number patabe  client side theke)
router.get('/requests',auth(USER_ROLE.landlord),RentalRequestControllers.getRentalRequestsForLandlord);
router.put('/requests/:id',auth(USER_ROLE.landlord),RentalRequestControllers.updateRequestStatus);



export const RentalHouseRoutes= router;