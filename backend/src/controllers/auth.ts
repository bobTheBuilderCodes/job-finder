import { Request, Response } from "express";
import { Users } from "../models/users";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  OK,
} from "../utils/response";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  try {
    // Destructure request body
    const { fullname, email, password } = req.body;

    // Validate request body
    if (!fullname || !email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Fullname, email, and password are required" });
    }

    // Check for existing user
    const existingUser = await Users.findOne({
      $or: [{ fullname }, { email }],
    });
    if (existingUser) {
      return res
        .status(CONFLICT)
        .json({ message: "User with this email or fullname already exists" });
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create New User
    const newUser = await Users.create({
      fullname,
      email,
      password: hashedPassword,
    });

    // Token expiry date
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "25d",
    });

    // Send data to client
    res.status(CREATED).json({
      message: "Signed up successfully",
      userDetails: {
        userId: newUser._id,
        token,
        fullname,
      },
    });
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to create user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {

    // Validate request body
    const { fullname, email, password } = req.body;

    if (!email || !password) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Please provide credentials to log in" });
    }

    // Check if user exists
    const user = await Users.findOne({ $or: [{ fullname }, { email }] });

    // Validate user credentials
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(BAD_REQUEST).json({ message: "Invalid Credentials" });
    }

    // Generate token for user
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "25d",
      }
    );

    // Returned logged in user to client
    return res.status(OK).json({
      message: "Login successful",
      userDetails: {
        token,
        userId: user?._id,
        fullname,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to log in user" });
  }
};
