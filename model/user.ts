import mongoose, { Schema, Document } from 'mongoose';
import jwt from 'jsonwebtoken';
var SECRET_KEY : any = process.env.SECRET_KEY
interface IUser extends Document {
  email: string;
  password: string;
  phone: number;
  name?: string;
  tokens: { token: string }[];
  generateAuthToken: () => Promise<string>;
}

const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  name: { type: String },
  tokens: [
    {
      token: { type: String, required: true },
    },
  ],
});

userSchema.methods.generateAuthToken = async function (): Promise<string> {
  try {
    const token =  jwt.sign({ _id: this._id }, SECRET_KEY);
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
    return `token is not generate ${error}`
  }
};

export const User = mongoose.model<IUser>('User', userSchema);