import { model, Schema } from "mongoose";
import { IOrder } from "./order.interface";


const orderSchema = new Schema({
  // user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    rentalHouse: { type: Schema.Types.ObjectId, ref: "RentalHouse", required: true },
    // quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending","Shipped" ,"Delivered", "Paid",  "Completed", "Cancelled"], default: 'Pending' },
    transaction: {
      id: String,
      transactionStatus: String,
      bank_status: String,
      sp_code: String,
      sp_message: String,
      method: String,
      date_time: String,
    }
  },
  { timestamps: true }
)


export const OrderModel= model<IOrder>('Order', orderSchema)