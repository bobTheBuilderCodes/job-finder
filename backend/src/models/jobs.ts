import mongoose, { Schema } from "mongoose";

const JobsSchema = new Schema({
    job_title: {
        type: String,
        required: true 
    },
    country: {
        type: String,
       
    },
    city: {
        type: String,
        required: true 
    },
    job_type: {
        type: String,
        required: true,
        enum: ['fulltime', 'part-time', 'internship', 'volunteer']
    },
    working_type: {
        type: String,
        required: true,
        enum: ['hybrid', 'remote', 'onsite']
    },
    salary: {
        type: String ,
    },
    job_description: {
        type: String,
        required: true 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID is required"]
    }
}, {
    timestamps: true  
}
);

export const Jobs = mongoose.model("Job", JobsSchema);
