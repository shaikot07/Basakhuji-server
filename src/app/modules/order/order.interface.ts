import mongoose from "mongoose";


export interface IOrder{
    user: mongoose.Types.ObjectId;
    email:string;
    // product:string;
    rentalHouse:mongoose.Types.ObjectId;
    totalPrice:number;
    status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled" |"Shipped" |"Delivered"| "Canceled";
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
    createdAt?: Date;
    updatedAt?: Date;
}