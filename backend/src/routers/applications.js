"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applications_1 = require("../controllers/applications");
const applicationRouter = express_1.default.Router();
applicationRouter.post("/apply/:jobId", applications_1.applyJob);
applicationRouter.get("/apply/user/:userId", applications_1.applicationByUser);
applicationRouter.put("/apply/approveApplication/:jobId", applications_1.approveApplicationStatus);
applicationRouter.put("/apply/rejectApplication/:jobId", applications_1.rejectApplicationStatus);
exports.default = applicationRouter;
