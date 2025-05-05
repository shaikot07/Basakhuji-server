import mongoose from 'mongoose';
// import { ProductModel } from '../products/product.model';
import { OrderModel } from './order.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { orderUtils } from './order.utils';
import { IOrder } from './order.interface';
import { rentalHouseModel } from '../rentalHouse/rentalHouse.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createOrderInToDB = async (orderData: any, client_ip: string) => {
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Start a transaction

  try {
    const { email, rentalHouse,  rentAmount } = orderData;
    const rentalHouseData = await rentalHouseModel.findById(rentalHouse).session(session);

    if (!rentalHouseData) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product not found');
    }


    // Validate total price
    const totalPrice = rentAmount;
    await rentalHouseData.save({ session });

    // Create order in the order database
    let order = new OrderModel({ email, rentalHouse,  totalPrice });
    await order.save({ session });

    // Payment integration
    const shurjopayPayload = {
      amount: totalPrice,
      order_id: order._id,
      currency: 'BDT',
      customer_name: 'N/A',
      customer_address: 'N/A',
      customer_email: email,
      customer_phone: 'N/A',
      customer_city: 'N/A',
      client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
    if (payment?.transactionStatus) {
      order = await OrderModel.findByIdAndUpdate(
        order._id,
        {
          transaction: {
            id: payment.sp_order_id,
            transactionStatus: payment.transactionStatus,
          },
        },
        { new: true, session }
      )as mongoose.Document<unknown,  IOrder> & IOrder & { _id: mongoose.Types.ObjectId };
    }

    await session.commitTransaction(); // Commit transaction
    session.endSession(); // end session

    return { order, payment };
  } catch (error) {
    await session.abortTransaction(); // rollback transaction in case of an error
    session.endSession();
    throw error;
  }
};

export { createOrderInToDB };



const verifyPayment = async (order_id: string) => {

  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        'transaction.id':order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

// get user spesick order
const getUserOrdersFromDB = async (email: string) => {
  return await OrderModel.find({ email })
    .populate('rentalHouse', 'rentAmount location')
    .sort({ createdAt: -1 });
};

// get all orders only for admin

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find()
    .populate('rentalHouse', 'rentAmount location')
    .sort({ createdAt: -1 });

  if (!result || result.length === 0) {
    throw new AppError(httpStatus.OK, 'No orders  available');
  }
  return result;
};

//  get a single order by ID
const getOrderByIdFromDB = async (orderId: string) => {
  const order = await OrderModel.findById(orderId).populate(
    'rentalHouse', 'rentAmount location',
  );
  if (!order) throw new AppError(httpStatus.NOT_FOUND, 'Order not found');

  return order;
};

/**
 * Cancel an order (User can cancel only pending orders)
  Order ID
 - User email
 */
const cancelOrderInDB = async (orderId: string, email: string) => {
  const order = await OrderModel.findOne({ _id: orderId, email });

  if (!order)
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found or unauthorized');

  if (order.status === 'Shipped' || order.status === 'Delivered') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Cannot cancel shipped or delivered orders',
    );
  }

  // // restore product stock
  // const productData = await ProductModel.findById(order.product);
  // if (productData) {
  //   productData.quantity += order.quantity;
  //   productData.inStock = true;
  //   await productData.save();
  // }

  order.status = 'Canceled';
  await order.save();
  return order;
};

/**
 * Update order status (admin only)
 * from client side- Order ID
 */
const updateOrderStatusInDB = async (
  orderId: string,
  status:
    | 'Pending'
    | 'Paid'
    | 'Shipped'
    | 'Completed'
    | 'Cancelled'
    | 'Shipped'
    | 'Delivered'
    | 'Canceled',
) => {
  const order = await OrderModel.findById(orderId);
  if (!order) throw new AppError(httpStatus.NOT_FOUND, 'order not found');

  order.status = status;
  await order.save();
  return order;
};

// Calculate Revenue from Orders using Aggregation
const calculateRevenue = async () => {
  const result = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  return result[0]?.totalRevenue || 0;
};

// -------------for tent chart------------------
const getTenantOrderSummary = async (email: string) => {
  const summary = await OrderModel.aggregate([
    {
      $match: { email }
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ]);

  const result = {
    Paid: 0,
    Pending: 0,
    Canceled: 0,
    Completed: 0,
    Delivered: 0,
    total: 0
  };

  summary.forEach(item => {
    const status = item._id as keyof typeof result;
    result[status] = item.count;
    result.total += item.count;
  });

  return result;
};








export const OrderServices = {
  createOrderInToDB,
  verifyPayment,
  getUserOrdersFromDB,
  getAllOrdersFromDB,
  getOrderByIdFromDB,
  cancelOrderInDB,
  updateOrderStatusInDB,
  calculateRevenue,
  getTenantOrderSummary
};
