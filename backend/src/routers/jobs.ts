import  express  from "express";
import { applicationsForJob, deleteJob, getJob, getJobs, jobsByUser, postJob, updateJob } from "../controllers/jobs";

export const jobsRouter = express.Router()


jobsRouter.get("/jobs", getJobs)
jobsRouter.post("/job", postJob)
jobsRouter.get("/job/:id", getJob)
jobsRouter.get("/jobs/user/:id",jobsByUser)
jobsRouter.put("/job/:id", updateJob)
jobsRouter.delete("/job/:id", deleteJob)
jobsRouter.get("/job/applications/:jobId", applicationsForJob)