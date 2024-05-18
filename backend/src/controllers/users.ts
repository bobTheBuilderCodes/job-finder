import { Request, Response } from "express";
import { Users } from "../models/users";
import { CREATED, INTERNAL_SERVER_ERROR , OK} from "../utils/index";



export const getUsers = async (req: Request, res: Response) => {
  const users = await Users.find({}).select("-password")
  res.status(OK).json({
    message: "Users fetched successfully.",
    users
  })
  
}


