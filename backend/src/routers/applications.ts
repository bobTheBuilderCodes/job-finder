import express from 'express'
import { applyJob } from '../controllers/applications'


const applicationRouter = express.Router()

applicationRouter.post("/jobs/:jobId/apply", applyJob)


export default applicationRouter