import { Request, Response } from "express";

import { Jobs } from "../models/jobs";
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
  hasAlreadyApplied,
} from "../utils/index";
import { Applications } from "../models/applications";
import { resourceLimits } from "worker_threads";
import mongoose from "mongoose";

export const getJobs = async (req: Request, res: Response) => {
  try {
      const { user } = req.body;  
   

      const jobs = await Jobs.find({}).sort({ createdAt: -1 });
      const jobApplications = await Promise.all(jobs.map(async (job: any) => {
          const application = await Applications.findOne({ jobId: job._id, userId: user });
          return {
              ...job.toObject(),  
              alreadyApplied: !!application 
          };
      }));

      res.status(OK).json({
          message: "Jobs fetched successfully",
          jobs: jobApplications,
          totalJobs: jobs.length,
      });
  } catch (error) {
      console.error("Error fetching jobs: ", error);
      res.status(INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong",
      });
  }
}


export const jobsByUser = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;  
        
       
        const jobs = await Jobs.find({ user: id }).sort({createdAt: -1});  

        if (jobs.length === 0) {
            return res.status(NOT_FOUND).json({
                message: "No jobs found for this user"
            });
        }

        res.status(OK).json({
            message: "User's jobs fetched successfully",
            jobs,
            totalJobs: jobs.length
        });
    } catch (error) {
       
        res.status(INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong.",
        });
    }
}


export const getJob = async (req: Request , res: Response) => {
    try {
        const {id} = req.params
        const job = await Jobs.findById(id)

        if(!job){
            return res.status(NOT_FOUND).json({
                message: "No job with this credentials exists"
            })
        }

        res.status(OK).json({
            message: "Job fetched successfully", job
        })
        
    } catch (error) {
      
        res.status(INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong.",
        });
      }
}


export const postJob = async (req: Request, res: Response) => {
  try {
    const {
      job_title,
    
      city,
      working_type,
      job_type,
     
      job_description,
      user,
    } = req.body;

    // Validating user request
    if (!job_title || !job_description || !working_type || !job_type || !city) {
      return res.status(BAD_REQUEST).json({
        message:
          "Please provide details for job title, job description, working type, job type and city.",
      });
    }

    if (!user) {
      return res.status(BAD_REQUEST).json({
        message: "Please provide user ID",
      });
    }

    const newJob = await Jobs.create(req.body);

    res.status(OK).json({
      message: "Job created successfully.",
      newJob,
    });
  } catch (error) {
  
    res.status(INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong.",
    });
  }
};


export const updateJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
        job_title,
        country,
        city,
        working_type,
        job_type,
        salary,
        job_description,
        user,
      } = req.body;

      if (!job_title || !job_description || !working_type || !job_type || !city) {
        return res.status(BAD_REQUEST).json({
            message: 'Please provide all required fields.'
        })
      }

      if (!user) {
        return res.status(BAD_REQUEST).json({
          message: "Please provide user ID.",
        });
      }


    const existingJob = await Jobs.findById(id);

    if (!existingJob) {
      return res.status(NOT_FOUND).json({
        message: "No job with this credentials exists.",
      });
    }

    if (existingJob.user.toString() !== user) {
      return res.status(BAD_REQUEST).json({
        message: "You do not have permission to edit this job."
      });
    }

    const updatedJob = await Jobs.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(OK).json({
        message: "Job updated successfully.",
        updatedJob
    })
  } catch (error) {
   
    res.status(INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong.",
    });
  }
};


export const deleteJob = async(req: Request, res: Response) => {
    try {
        const {id} = req.params
        const {user} = req.body;

        const existingJob = await Jobs.findById(id)

        if(!existingJob){
            return res.status(NOT_FOUND).json({
                message: "Job does not exist"
            })
        }

        if (existingJob.user.toString() !== user) {
          return res.status(BAD_REQUEST).json({
            message: "You do not have permission to edit this job."
          });
        }

        await Jobs.findByIdAndDelete(id)

        res.status(OK).json({
            message: 'Job deleted successfully'
        })



    } catch (error) {
       
        res.status(INTERNAL_SERVER_ERROR).json({
          message: "Something went wrong.",
        });
      }
}


export const applicationsForJob = async (req: Request, res: Response) => {
  try {
    const jobId = req.params.jobId;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(BAD_REQUEST).json({
        message: `Invalid job ID format.`,
      });
    }

    const existingJob = await Jobs.findById(jobId);

    if (!existingJob) {
      return res.status(NOT_FOUND).json({
        message: `This job does not exist.`,

      });
    }

    const findApplicationsForJob = await Applications.find({ jobId }).sort({ createdAt: -1 });

    if (!findApplicationsForJob.length) {
      return res.status(NOT_FOUND).json({
        message: `You have no applications for this job.`,
      });
    }

    res.status(OK).json({
      message: "Applications for job fetched successfully",
      applicationsForJob: findApplicationsForJob,
    });

  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong",
    });
  }
};

