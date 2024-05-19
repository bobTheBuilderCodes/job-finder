import express from 'express'
import { applicationByUser, applyJob, approveApplicationStatus, rejectApplicationStatus } from '../controllers/applications'


const applicationRouter = express.Router()

applicationRouter.post("/apply/:jobId", applyJob)
applicationRouter.get("/apply/user/:userId",applicationByUser)
applicationRouter.put("/apply/approveApplication/:jobId", approveApplicationStatus)
applicationRouter.put("/apply/rejectApplication/:jobId", rejectApplicationStatus)


export default applicationRouter