import { Request, Response, NextFunction, RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userService from "../services/user.service";

export const signUp: RequestHandler = async (req, res) => {
  try {
    console.log("called signup", req.body);
    
    const { name, email, password } = req.body;
    const existingUser = await userService.findUserByEmail(email);

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = await userService.createUser(name, email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  check if user exists
    const user = await userService.findUserByEmail(email);

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.user_password);

    if (!isMatch) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // create token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );


    // send response
    res.json({ token, user: { id: user.user_id, name: user.user_name, email: user.user_email } });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
