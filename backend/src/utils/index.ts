import { StatusCodes } from "http-status-codes";
import { Jobs } from "../models/jobs";
import nodemailer from 'nodemailer'


export const {BAD_GATEWAY, BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED, CONFLICT, OK, NOT_FOUND} = StatusCodes


export async function hasAlreadyApplied(userId: string, jobId: string): Promise<boolean> {
    const application = await Jobs.findOne({ user_id: userId, job_id: jobId });
    return application !== null;
}

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,

    secure: false,
    auth: {
      user: 'robertksam2000@gmail.com',
      pass: 'Robertina@2024' 
    }
  });
  