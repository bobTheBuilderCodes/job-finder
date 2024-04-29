import express from 'express'
import { applicationByUser, applyJob } from '../controllers/applications'


const applicationRouter = express.Router()

applicationRouter.post("/apply/:jobId", applyJob)
applicationRouter.get("/apply/user/:userId",applicationByUser)


export default applicationRouter