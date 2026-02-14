import "express-async-errors"
import express from "express"
import * as dotenv from "dotenv"
import morgan from "morgan"
import cors from "cors"
import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"
///routes
import jobRouter from "./routes/jobRouter.js"
import authRouter from "./routes/authRouter.js"
import userRouter from "./routes/userRouter.js"
import reminderRouter from "./routes/reminderRouter.js"
import interviewRouter from "./routes/interviewRouter.js"
import applyRouter from "./routes/applyRouter.js"

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
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        process.env.CLIENT_URL_1,
        process.env.CLIENT_URL_2,
        process.env.CLIENT_URL_3,
      ]

      if (!origin && process.env.NODE_ENV === "development") {
        return callback(null, true)
      }

      if (
        origin?.startsWith("chrome-extension://") ||
        origin?.startsWith("moz-extension://")
      ) {
        return callback(null, true)
      }

      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  }),
)
app.use(express.json())

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route works" })
})

////ENTRY POINT FOR THE SERVER
app.use("/api/v1/jobs", authenticateUser, jobRouter)
app.use("/api/v1/users", authenticateUser, userRouter)
app.use("/api/v1/reminders", authenticateUser, reminderRouter)
app.use("/api/v1/interviews", authenticateUser, interviewRouter)
app.use("/api/v1/applybuddy", authenticateUser, applyRouter)
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
