import mongoose, { Schema, Document, Types, HydratedDocument } from "mongoose"
import {
  JOB_STATUS,
  JOB_TYPES,
  JOB_MODE,
  JobStatus,
  JobType,
  JobMode,
} from "../utils/constants.js"

// interface JobData {
//   company: string
//   position: string
//   jobStatus: JobStatus
//   jobMode: JobMode
//   jobType: JobType
//   jobLocation: string
//   jobDescription?: string
//   jobUrl: string
//   requiredSkills: string[]
//   matchedSkills: string[]
//   missingSkills: string[]
//   matchScore: number
//   createdBy: Types.ObjectId
// }

// export interface JobDocument extends JobData, Document {
//   createdAt: Date
//   updatedAt: Date
// }

///-------------------------------schema-----------------------------------------------------------------

const JobSchema = new Schema(
  {
    company: { type: String, required: true },
    position: { type: String, required: true },
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobMode: {
      type: String,
      enum: Object.values(JOB_MODE),
      default: JOB_MODE.REMOTE,
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPES),
      default: JOB_TYPES.FULLTIME,
    },
    jobLocation: {
      type: String,
      default: "My City",
    },
    jobDescription: {
      type: String,
    },
    jobUrl: {
      type: String,
      default: "",
    },
    requiredSkills: {
      type: [String],
      default: [],
    },
    matchedSkills: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    matchScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
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

JobSchema.index({ createdBy: 1, jobUrl: 1 }, { unique: true })

export type Job = mongoose.InferSchemaType<typeof JobSchema>

export type JobDoc = HydratedDocument<Job>

export type JobLean = Job & {
  _id: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export default mongoose.model<JobDoc>("Job", JobSchema)
