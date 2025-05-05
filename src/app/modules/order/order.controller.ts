import { NextFunction, Request, Response } from 'express';
import { OrderServices } from './order.services';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    console.log(order);
    const result = await OrderServices.createOrderInToDB(order, req.ip!);
    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    // console.log(err);
    // res.status(400).json({
    //   message: err.message || 'An unexpected error occurred',
    //   success: false,
    //   error: {
    //     name: err.name,
    //     message: err.message,
    //     // stack: err.stack,
    //   },
    //   stack: err.stack,
    // });
    next(error);
  }
};

const verifyPayment = catchAsync(async (req, res) => {
//  console.log("hi");
//  console.log("order id from controller", req.query as string);
//  const result = await OrderServices.verifyPayment()

 const result = await OrderServices.verifyPayment(req.query.order_id as string);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order verified successfully',
    data: result,
  });;
});






const getUserOrders = catchAsync(async (req, res,) => {
  console.log("this is order controller", req.user.email);
  const email = req.user.email;
  const result = await OrderServices.getUserOrdersFromDB(email)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'order! retrieved successfully',
    data: result,
  });
});

// for admin 
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.getAllOrdersFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All orders retrieved successfully',
    data: result,
  });
});


// get order by id 
const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.id;
  console.log(orderId);
  const result = await OrderServices.getOrderByIdFromDB(orderId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order retrieved successfully',
    data: result,
  });
});

// user cancel Order 
const cancelOrder = catchAsync(async (req: Request, res: Response) => {
  console.log('Cancel order request from:', req.user.email);
  const email = req.user.email;
  const result = await OrderServices.cancelOrderInDB(req.params.orderId, email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order canceled successfully',
    data: result,
  });
});

// admin updated  statust 
const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { status } = req.body;
  const result = await OrderServices.updateOrderStatusInDB(req.params.orderId, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});


// get Revenue
const getRevenueData = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const totalRevenue = await OrderServices.calculateRevenue();
    
    res.status(200).json({
      message: 'revenue calculated successfully',
      status: true,
      data: { totalRevenue },
    });
  } catch (error) {
    // res.status(500).json({ message: 'fail calculating revenue', status: false, error });
    next(error)
  }
};
// -------------for tent chart ------------------
const getTenantOrderSummary = catchAsync(async (req: Request, res: Response) => {
  const email = req.params.email;
  const data = await OrderServices.getTenantOrderSummary(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tenant order summary fetched",
    data
  });
});

export const OrderControllers = {
  createOrder,
  verifyPayment,
  getUserOrders,
  getAllOrders,
  getOrderById,
  cancelOrder,
  updateOrderStatus,
  getRevenueData,
  getTenantOrderSummary
};
