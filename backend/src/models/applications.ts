import mongoose, { Schema } from "mongoose";

const ApplicationSchema = new Schema({

   fullname: {
    type: String,
    required: true
   },
   email: {
    type: String,
    required: true
   },
   address: {
    type: String,
   },
   salary_expectation: {
    type: String,
   },
   status:{
      type: String,
    enum: ["pending review", "shortlisted for interview", "rejected"],
    default: "pending review"
   },
   cover_letter: {
    type: String,
    required: true
   },
   jobId: {
    type: String,
   //  required: true
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "User ID is required."]
  }
},{
   timestamps: true  
})


export const Applications = mongoose.model("Application", ApplicationSchema)