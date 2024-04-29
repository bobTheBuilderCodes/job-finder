import { Request, Response } from 'express';
import { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, OK, hasAlreadyApplied } from '../utils';
import { Users } from '../models/users';
import { Applications } from '../models/applications';

export const applyJob = async (req: Request, res: Response) => {
    try {
        const { fullname, email, address, salary_expectation, status, cover_letter, user } = req.body;
        const { jobId } = req.params;

        // Validate jobId in the URL
        if (!jobId) {
            return res.status(BAD_REQUEST).json({
                message: "Job ID is required."
            });
        }

        console.log("Job Id", jobId);

        // Validate required fields in the body
        if (!fullname || !email || !cover_letter) {
            return res.status(BAD_REQUEST).json({
                message: "Fullname, email, and cover letter are all required."
            });
        }

        // Validate user ID in the body
        if (!user) {
            return res.status(BAD_REQUEST).json({
                message: "User ID is required."
            });
        }

        // Check if the user exists
        const existingUser = await Users.findById({_id: user});
        if (!existingUser) {
            return res.status(NOT_FOUND).json({
                message: "User not found"
            });
        }

        // Check if user has already applied for job
        const alreadyApplied = await hasAlreadyApplied(user, jobId)

        if(alreadyApplied){
            return res.status(CONFLICT).json({
                message: "You have already applied for this job"
            })
        }

        // Create job application
        const jobApplication = await Applications.create({
            jobId,
            fullname,
            email,
            address,
            salary_expectation,
            status,
            cover_letter,
            user
        });

        res.status(OK).json({
            message: "Job applied successfully",
            jobApplication
        });

    } catch (error) {
        console.log("Error", error);
        res.status(INTERNAL_SERVER_ERROR).json({
            message: "Failed to apply for the job at the moment"
        });
    }
};
