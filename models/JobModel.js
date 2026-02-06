import mongoose from "mongoose"
import { JOB_STATUS, JOB_TYPES } from "../utils/constants.js"

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobMode: {
      type: String,
      enum: ["remote", "on-site", "hybrid"],
      default: "remote",
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
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
)

JobSchema.index({ createdBy: 1, jobUrl: 1 }, { unique: true })

export default mongoose.model("Job", JobSchema)
