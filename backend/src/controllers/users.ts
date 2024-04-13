import { Request, Response } from "express";
import { Users } from "../models/users";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR , CONFLICT, OK} from "../utils/response";



export const getUsers = async (req: Request, res: Response) => {
  const users = await Users.find({}).select("-password")
  res.status(OK).json({
    message: "Users fetched successfully",
    users
  })
}


