"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const authRouter = express_1.default.Router();
authRouter.post("/signup", auth_1.signUp);
authRouter.post("/login", auth_1.login);
authRouter.post("/forgot-password", auth_1.forgotPassword);
exports.default = authRouter;
