"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPassword = exports.login = exports.signUp = void 0;
const users_1 = require("../models/users");
const index_1 = require("../utils/index");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure request body
        const { fullname, email, password } = req.body;
        // Validate request body
        if (!fullname || !email || !password) {
            return res
                .status(index_1.BAD_REQUEST)
                .json({ message: "Fullname, email, and password are required" });
        }
        // Check for existing user
        const existingUser = yield users_1.Users.findOne({
            $or: [{ fullname }, { email }],
        });
        if (existingUser) {
            return res
                .status(index_1.CONFLICT)
                .json({ message: "User with this email or fullname already exists" });
        }
        // Hash user password
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // Create New User
        const newUser = yield users_1.Users.create({
            fullname,
            email,
            password: hashedPassword,
        });
        // Token expiry date
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "25d",
        });
        // Send data to client
        res.status(index_1.CREATED).json({
            message: "Signed up successfully",
            userDetails: {
                userId: newUser._id,
                token,
                fullname,
            },
        });
    }
    catch (error) {
        res
            .status(index_1.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to create user" });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body
        const { fullname, email, password } = req.body;
        if (!email || !password) {
            return res
                .status(index_1.BAD_REQUEST)
                .json({ message: "Please provide credentials to log in" });
        }
        // Check if user exists
        const user = yield users_1.Users.findOne({ $or: [{ fullname }, { email }] });
        // Validate user credentials
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(index_1.BAD_REQUEST).json({ message: "Invalid Credentials" });
        }
        // Generate token for user
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "25d",
        });
        // Returned logged in user to client
        return res.status(index_1.OK).json({
            message: "Login successful",
            userDetails: {
                token,
                userId: user === null || user === void 0 ? void 0 : user._id,
                fullname: user === null || user === void 0 ? void 0 : user.fullname,
            },
        });
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res
            .status(index_1.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to log in user" });
    }
});
exports.login = login;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res
                .status(index_1.BAD_REQUEST)
                .json({ message: "Please provide an email." });
        }
        const user = yield users_1.Users.findOne({ email });
        if (!user) {
            return res.status(index_1.NOT_FOUND).json({ message: "No user with this email exists" });
        }
        // Generate a reset token (you could use JWT or any other method you prefer)
        const resetToken = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
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
        yield index_1.transporter.sendMail(mailOptions);
        res.status(index_1.OK).json({ message: "Password reset link sent to your email address" });
    }
    catch (error) {
        console.error("Error during password reset process:", error);
        res.status(index_1.INTERNAL_SERVER_ERROR).json({ message: "Unable to send password reset email" });
    }
});
exports.forgotPassword = forgotPassword;
