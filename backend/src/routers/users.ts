import express from 'express'
import { getUsers } from '../controllers/users'



const userRouter = express.Router()


userRouter.get("/users", getUsers)


export default userRouter