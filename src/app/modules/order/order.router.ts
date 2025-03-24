import express from 'express'
import { OrderControllers } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
// import auth from '../../middlewares/auth';

const router =express.Router()


// api route here 
router.get("/revenue",OrderControllers.getRevenueData)
router.post('/create-order',OrderControllers.createOrder);
router.delete('/:orderId',auth(USER_ROLE.customer),OrderControllers.cancelOrder);
router.get('/get-user-order',auth(USER_ROLE.customer),OrderControllers.getUserOrders);
router.get('/get-all-orders',auth(USER_ROLE.admin),OrderControllers.getAllOrders);
router.get('/verify-payment',auth(USER_ROLE.customer),OrderControllers.verifyPayment);
router.get('/:id',OrderControllers.getOrderById);
router.patch('/:orderId/status',auth(USER_ROLE.admin),OrderControllers.updateOrderStatus);

// router.get("/verify-payment-pro",auth(USER_ROLE.customer), OrderControllers.verifyPayment)


export const OrderRoutes= router;




