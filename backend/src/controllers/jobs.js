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
exports.applicationsForJob = exports.deleteJob = exports.updateJob = exports.postJob = exports.getJob = exports.jobsByUser = exports.getJobs = void 0;
const jobs_1 = require("../models/jobs");
const index_1 = require("../utils/index");
const applications_1 = require("../models/applications");
const mongoose_1 = __importDefault(require("mongoose"));
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const jobs = yield jobs_1.Jobs.find({}).sort({ createdAt: -1 });
        const jobApplications = yield Promise.all(jobs.map((job) => __awaiter(void 0, void 0, void 0, function* () {
            const application = yield applications_1.Applications.findOne({ jobId: job._id, userId: user });
            return Object.assign(Object.assign({}, job.toObject()), { alreadyApplied: !!application });
        })));
        res.status(index_1.OK).json({
            message: "Jobs fetched successfully",
            jobs: jobApplications,
            totalJobs: jobs.length,
        });
    }
    catch (error) {
        console.error("Error fetching jobs: ", error);
        res.status(index_1.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong",
        });
    }
});
exports.getJobs = getJobs;
const jobsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const jobs = yield jobs_1.Jobs.find({ user: id }).sort({ createdAt: -1 });
        if (jobs.length === 0) {
            return res.status(index_1.NOT_FOUND).json({
                message: "No jobs found for this user"
            });
        }
        res.status(index_1.OK).json({
            message: "User's jobs fetched successfully",
            jobs,
            totalJobs: jobs.length
        });
    }
    catch (error) {
        res.status(index_1.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong.",
        });
    }
});
exports.jobsByUser = jobsByUser;
const getJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const job = yield jobs_1.Jobs.findById(id);
        if (!job) {
            return res.status(index_1.NOT_FOUND).json({
                message: "No job with this credentials exists"
            });
        }
        res.status(index_1.OK).json({
            message: "Job fetched successfully", job
        });
    }
    catch (error) {
        res.status(index_1.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong.",
        });
    }
});
exports.getJob = getJob;
const postJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { job_title, city, working_type, job_type, job_description, user, } = req.body;
        // Validating user request
        if (!job_title || !job_description || !working_type || !job_type || !city) {
            return res.status(index_1.BAD_REQUEST).json({
                message: "Please provide details for job title, job description, working type, job type and city.",
            });
        }
        if (!user) {
            return res.status(index_1.BAD_REQUEST).json({
                message: "Please provide user ID",
            });
        }
        const newJob = yield jobs_1.Jobs.create(req.body);
        res.status(index_1.OK).json({
            message: "Job created successfully.",
            newJob,
        });
    }
    catch (error) {
        res.status(index_1.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong.",
        });
    }
});
exports.postJob = postJob;
const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { job_title, country, city, working_type, job_type, salary, job_description, user, } = req.body;
        if (!job_title || !job_description || !working_type || !job_type || !city) {
            return res.status(index_1.BAD_REQUEST).json({
                message: 'Please provide all required fields.'
            });
        }
        if (!user) {
            return res.status(index_1.BAD_REQUEST).json({
                message: "Please provide user ID.",
            });
        }
        const existingJob = yield jobs_1.Jobs.findById(id);
        if (!existingJob) {
            return res.status(index_1.NOT_FOUND).json({
                message: "No job with this credentials exists.",
            });
        }
        if (existingJob.user.toString() !== user) {
            return res.status(index_1.BAD_REQUEST).json({
                message: "You do not have permission to edit this job."
            });
        }
        const updatedJob = yield jobs_1.Jobs.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(index_1.OK).json({
            message: "Job updated successfully.",
            updatedJob
        });
    }
    catch (error) {
        res.status(index_1.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong.",
        });
    }
});
exports.updateJob = updateJob;
const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user } = req.body;
        const existingJob = yield jobs_1.Jobs.findById(id);
        if (!existingJob) {
            return res.status(index_1.NOT_FOUND).json({
                message: "Job does not exist"
            });
        }
        if (existingJob.user.toString() !== user) {
            return res.status(index_1.BAD_REQUEST).json({
                message: "You do not have permission to edit this job."
            });
        }
        yield jobs_1.Jobs.findByIdAndDelete(id);
        res.status(index_1.OK).json({
            message: 'Job deleted successfully'
        });
    }
    catch (error) {
        res.status(index_1.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong.",
        });
    }
});
exports.deleteJob = deleteJob;
const applicationsForJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.jobId;
        if (!mongoose_1.default.Types.ObjectId.isValid(jobId)) {
            return res.status(index_1.BAD_REQUEST).json({
                message: `Invalid job ID format.`,
            });
        }
        const existingJob = yield jobs_1.Jobs.findById(jobId);
        if (!existingJob) {
            return res.status(index_1.NOT_FOUND).json({
                message: `This job does not exist.`,
            });
        }
        const findApplicationsForJob = yield applications_1.Applications.find({ jobId }).sort({ createdAt: -1 });
        if (!findApplicationsForJob.length) {
            return res.status(index_1.NOT_FOUND).json({
                message: `You have no applications for this job.`,
            });
        }
        res.status(index_1.OK).json({
            message: "Applications for job fetched successfully",
            applicationsForJob: findApplicationsForJob,
        });
    }
    catch (error) {
        res.status(index_1.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong",
        });
    }
});
exports.applicationsForJob = applicationsForJob;
