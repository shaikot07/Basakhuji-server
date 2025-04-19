import { model, Schema } from 'mongoose';
import { IRentalHouse } from './rentalHouse.interface';

const rentalHouseSchema = new Schema(
  {
    location: { type: String, required: true },
    description: { type: String, required: true },
    rentAmount: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bath: { type: Number, },
    // amenities:{ type: String, required: true },
    amenities: { type: String },
    images: [{ type: String, required: true }], // Array of image URLs
    landlordId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const rentalHouseModel = model<IRentalHouse>(
  'RentalHouse',
  rentalHouseSchema,
);
