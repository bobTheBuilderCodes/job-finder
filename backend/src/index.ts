import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 5000

const app = express()

// middlewares
app.use(express.json())


// Routers
import authRouter from './routers/auth'
import userRouter from './routers/users'
import { jobsRouter } from './routers/jobs'


app.use("/api/v1", authRouter)
app.use("/api/v1", userRouter)
app.use("/api/v1", jobsRouter)


async function startApp(){

    try {
        console.log("Connecting to DB...")
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("Connected to DB successfully")
        app.listen(PORT, ()=>console.log(`Server listening on port ${PORT}...`))
        

    } catch (error) {
        console.log("Error connecting to database", error)
    }
}


startApp()

