import { Request, Response } from "express";
import { Users } from "../models/users";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  CONFLICT,
  OK,
  NOT_FOUND,
  transporter,
} from "../utils/index";
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
        fullname: user?.fullname,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Failed to log in user" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(BAD_REQUEST)
        .json({ message: "Please provide an email." });
    }

    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(NOT_FOUND).json({ message: "No user with this email exists" });
    }

    // Generate a reset token (you could use JWT or any other method you prefer)
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    // Reset URL (Adjust the URL as per your frontend route)
    const resetUrl = `http://localhost:3000/forgot-password/${user._id}/${resetToken}`;

    // Setup email data
    const mailOptions = {
      from: 'jobfinder@gmail.com',
      to: email, // list of receivers
      subject: 'Password Reset Link',
      text: 'Please use the following link to reset your password:', 
      html: `<p>Please use the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>` // HTML body content
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(OK).json({ message: "Password reset link sent to your email address" });
  } catch (error) {
    console.error("Error during password reset process:", error);
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Unable to send password reset email" });
  }
};
