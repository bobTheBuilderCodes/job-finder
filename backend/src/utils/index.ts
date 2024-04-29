import { StatusCodes } from "http-status-codes";
import nodemailer from 'nodemailer'
import { Applications } from "../models/applications";


export const {BAD_GATEWAY, BAD_REQUEST, INTERNAL_SERVER_ERROR, CREATED, CONFLICT, OK, NOT_FOUND} = StatusCodes


export async function hasAlreadyApplied(userId: string, jobId: string): Promise<boolean> {
  const application = await Applications.findOne({ user: userId, jobId: jobId });
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
  