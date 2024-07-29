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
Object.defineProperty(exports, "__esModule", { value: true });
exports.rejectApplicationStatus = exports.approveApplicationStatus = exports.applicationByUser = exports.applyJob = void 0;
const utils_1 = require("../utils");
const users_1 = require("../models/users");
const applications_1 = require("../models/applications");
const applyJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, address, salary_expectation, status, cover_letter, user, } = req.body;
        const { jobId } = req.params;
        // Validate jobId in the URL
        if (!jobId) {
            return res.status(utils_1.BAD_REQUEST).json({
                message: "Job ID is required.",
            });
        }
        // Validate required fields in the body
        if (!fullname || !email || !cover_letter) {
            return res.status(utils_1.BAD_REQUEST).json({
                message: "Fullname, email, and cover letter are all required.",
            });
        }
        // Validate user ID in the body
        if (!user) {
            return res.status(utils_1.BAD_REQUEST).json({
                message: "User ID is required.",
            });
        }
        // Check if the user exists
        const existingUser = yield users_1.Users.findById({ _id: user });
        if (!existingUser) {
            return res.status(utils_1.NOT_FOUND).json({
                message: "User not found",
            });
        }
        // Check if user has already applied for job
        const alreadyApplied = yield (0, utils_1.hasAlreadyApplied)(user, jobId);
        if (alreadyApplied) {
            return res.status(utils_1.CONFLICT).json({
                message: "You have already applied for this job",
            });
        }
        // Create job application
        const jobApplication = yield applications_1.Applications.create({
            jobId,
            fullname,
            email,
            address,
            salary_expectation,
            status,
            cover_letter,
            user,
        });
        res.status(utils_1.OK).json({
            message: "Job applied successfully",
            jobApplication,
            hasAlreadyApplied: alreadyApplied,
        });
    }
    catch (error) {
        res.status(utils_1.INTERNAL_SERVER_ERROR).json({
            message: "Failed to apply for the job at the moment",
        });
    }
});
exports.applyJob = applyJob;
const applicationByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const application = yield applications_1.Applications.find({ user: userId }).sort({
            createdAt: -1,
        });
        if (application.length === 0) {
            return res.status(utils_1.NOT_FOUND).json({
                message: "No application found for this user",
            });
        }
        res.status(utils_1.OK).json({
            message: "User's application fetched successfully",
            application,
            totalapplication: application.length,
        });
    }
    catch (error) {
        res.status(utils_1.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong.",
        });
    }
});
exports.applicationByUser = applicationByUser;
const approveApplicationStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId } = req.params;
        const existingJob = yield applications_1.Applications.findById(jobId);
        if (!existingJob) {
            return res.status(utils_1.NOT_FOUND).json({
                message: "No application with this credentials exists.",
            });
        }
        const updatedJob = yield applications_1.Applications.findByIdAndUpdate(jobId, Object.assign(Object.assign({}, req.body), { status: "Shortlisted" }), {
            new: true,
            runValidators: true,
        });
        res.status(utils_1.OK).json({
            message: "Applicant shortlisted successfully.",
            updatedJob,
        });
    }
    catch (error) {
        res.status(utils_1.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong.",
        });
    }
});
exports.approveApplicationStatus = approveApplicationStatus;
const rejectApplicationStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { jobId } = req.params;
        const existingJob = yield applications_1.Applications.findById(jobId);
        if (!existingJob) {
            return res.status(utils_1.NOT_FOUND).json({
                message: "No application with this credentials exists.",
            });
        }
        const updatedJob = yield applications_1.Applications.findByIdAndUpdate(jobId, Object.assign(Object.assign({}, req.body), { status: "Rejected" }), {
            new: true,
            runValidators: true,
        });
        res.status(utils_1.OK).json({
            message: "Applicant rejected successfully.",
            updatedJob,
        });
    }
    catch (error) {
        res.status(utils_1.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong.",
        });
    }
});
exports.rejectApplicationStatus = rejectApplicationStatus;
