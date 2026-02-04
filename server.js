import "express-async-errors"
import express from "express"
import * as dotenv from "dotenv"
import morgan from "morgan"
import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"
///routes
import jobRouter from "./routes/jobRouter.js"
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"
import reminderRouter from "./routes/reminderRouter.js"
import interviewRouter from "./routes/interviewRouter.js"

import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js"
import { authenticateUser } from "./middleware/authMiddleware.js"
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const __dirname = dirname(fileURLToPath(import.meta.url))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
app.use(express.static(path.resolve(__dirname, "./client/dist")))
app.use(cookieParser())
app.use(express.json())

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route works" })
})

////ENTRY POINT FOR THE SERVER
app.use("/api/v1/jobs", authenticateUser, jobRouter)
app.use("/api/v1/users", authenticateUser, userRouter)
app.use("/api/v1/reminders", authenticateUser, reminderRouter)
app.use("/api/v1/interviews", authenticateUser, interviewRouter)
app.use("/api/v1/applybuddy")
app.use("/api/v1/auth", authRouter)

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"))
})

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" })
})

app.use(errorHandlerMiddleware)

try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`Example app listening on port :${port}`)
  })
} catch (err) {
  console.log(err)
  process.exit(1)
}
