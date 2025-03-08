import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserModel } from './user.interface';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String }, // Changed from number to string
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "landlord", "tenant"], default: "tenant" },
    isBlocked: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    passwordChangedAt: { type: Date },
    profileImg: { type: String,default: " "  }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsById = async function (_id: string) {
  return await User.findOne({_id }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};



export const User = model<TUser, UserModel>('User', userSchema);
