import jwt from 'jsonwebtoken';
import { User } from '../model/user';

var SECRET_KEY : any = process.env.SECRET_KEY
export  const Auth = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.jwt;
    const verify = jwt.verify(token, SECRET_KEY) as { _id: string };
    const user = await User.findOne({ _id: verify._id });
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json(error);
  }
};