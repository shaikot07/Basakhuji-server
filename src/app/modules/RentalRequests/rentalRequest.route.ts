
import express from 'express'
import { RentalRequestControllers } from './rentalRequest.controller';



const router =express.Router()

// api ai route here 

// router.post('/create-product',StudentControllers.createStudent);
router.post('/requests', RentalRequestControllers.createRentalRequest);
// router.get('/requests',RentalRequestControllers.getRentalRequestsForLandlord);
router.get('/requests/:id', RentalRequestControllers.getRentalRequest);
// router.put('/requests/:id',RentalHouseControllers.updatedHouseById);
// router.delete('/requests/:id', RentalHouseControllers.deletedRentalHouseById);
// -----------------------------------
router.get("/tenant-summary/:id", RentalRequestControllers.getRentalRequestSummary);
// router.get("/lanload-summary/:id", RentalRequestControllers.getRentalRequestSummaryByLanload);
router.get( "/rental-request/summary/admin", RentalRequestControllers.getAllRentalRequestSummaryForAdmin);


export const RentalRequestRoutes= router;