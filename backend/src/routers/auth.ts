import express from 'express'
import {  forgotPassword, login, signUp } from '../controllers/auth'


const authRouter = express.Router()


authRouter.post("/signup", signUp)
authRouter.post("/login", login)
authRouter.post("/forgot-password", forgotPassword)


export default authRouter