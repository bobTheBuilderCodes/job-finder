"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobsRouter = void 0;
const express_1 = __importDefault(require("express"));
const jobs_1 = require("../controllers/jobs");
exports.jobsRouter = express_1.default.Router();
exports.jobsRouter.get("/jobs", jobs_1.getJobs);
exports.jobsRouter.post("/job", jobs_1.postJob);
exports.jobsRouter.get("/job/:id", jobs_1.getJob);
exports.jobsRouter.get("/jobs/user/:id", jobs_1.jobsByUser);
exports.jobsRouter.put("/job/:id", jobs_1.updateJob);
exports.jobsRouter.delete("/job/:id", jobs_1.deleteJob);
exports.jobsRouter.get("/job/applications/:jobId", jobs_1.applicationsForJob);
