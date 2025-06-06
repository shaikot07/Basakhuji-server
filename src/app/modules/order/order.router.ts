import express from 'express'
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
// import auth from '../../middlewares/auth';

const router =express.Router()


// api route here 
router.get("/revenue",OrderControllers.getRevenueData)
router.post('/create-order',OrderControllers.createOrder);
// router.delete('/:orderId',auth(USER_ROLE.customer),OrderControllers.cancelOrder);
router.get('/get-user-order',OrderControllers.getUserOrders);
router.get('/get-all-orders',auth(USER_ROLE.admin),OrderControllers.getAllOrders);
// router.get('/verify-payment/:id',OrderControllers.verifyPayment);
router.get('/verify-payment',auth(USER_ROLE.tenant),OrderControllers.verifyPayment);
router.get('/:id',OrderControllers.getOrderById);
router.patch('/:orderId/status',auth(USER_ROLE.admin),OrderControllers.updateOrderStatus);

// router.get("/verify-payment-pro",auth(USER_ROLE.customer), OrderControllers.verifyPayment)
// for tent chart 
router.get("/tenant-order-summary/:email",OrderControllers.getTenantOrderSummary);
router.get("/lanload-order-summary/:id",OrderControllers.getLanloadOrderSummary);


export const OrderRoutes= router;




