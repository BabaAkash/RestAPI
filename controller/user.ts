import {Request,Response} from "express";
import { User } from '../model/user';

export const signup = async (req: Request, res: Response) => {
  try {
    let existUser = await User.findOne({ email: req.body.email });
    if (!existUser) {
      let data = new User({ ...req.body });
      let result = await data.save();
      res.status(201).json({ success: " new user", result });
    } else {
      res.status(202).json({ msg: "user already exist" });
    }
  } catch (error) {
    res.status(501).json(error);
  }
};

export const login = async (req: Request, res: Response) => {
  let password = req.body.password;
  try {
    let user = await User.findOne({ email: req.body.email });
    let token = await user?.generateAuthToken()
    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 600000),
      httpOnly: true
    });

    if (!user) {
      res.status(200).json({ msg: "user not register" });
    } else if (user.password !== password) {
      res.status(200).json({ msg: "password not match" });
    } else {
      res.status(200).json({ success: "Login", token });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export const userProfile = async (req: any, res: any) => {
  let userData = req.user;
  res.json(userData);
};

export const logout = async (req: any, res: any) => {
  try {
    req.user.tokens = [];
    res.clearCookie('jwt');

    await req.user.save();
    res.status(200).json({ msg: "logout succesfull" });
  } catch (error) {
    res.status(501).json({ msg: "logout succesfull" });
  }
};