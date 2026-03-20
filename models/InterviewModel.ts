import mongoose, { Schema } from "mongoose"
import { INTERVIEW_MODE, INTERVIEW_STATUS } from "../utils/constants.js"
import { InterviewDoc } from "../types/index.js"

const InterviewSchema = new Schema<InterviewDoc>(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    interviewAt: {
      type: Date,
      required: true,
    },
    mode: {
      type: String,
      enum: Object.values(INTERVIEW_MODE),
      default: INTERVIEW_MODE.ONLINE,
    },
    location: {
      type: String,
    },
    notes: {
      type: String,
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
    },
    status: {
      type: String,
      enum: Object.values(INTERVIEW_STATUS),
      default: INTERVIEW_STATUS.UPCOMING,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

InterviewSchema.index({ createdBy: 1, interviewAt: 1 })

// export type Interview = mongoose.InferSchemaType<typeof InterviewSchema>

// export type InterviewDoc = HydratedDocument<Interview>

export default mongoose.model<InterviewDoc>("Interview", InterviewSchema)
