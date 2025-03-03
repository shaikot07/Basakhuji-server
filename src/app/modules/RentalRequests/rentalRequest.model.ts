import { model, Schema } from "mongoose";
import { IRentalRequest } from "./rentalRequest.interface";



const rentalRequestSchema = new Schema(
    {
        rentalHouseId: { type: Schema.Types.ObjectId, ref: "RentalHouse", required: true },
        tenantId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
        landlordPhoneNumber: { type: String },
        paymentStatus: { type: String, enum: ["pending", "paid"] },
        additionalMessage: { type: String },
    },
    { timestamps: true }
);


export const RentalRequestModel = model<IRentalRequest>('RentalRequest', rentalRequestSchema);