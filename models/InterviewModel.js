import mongoose from "mongoose"

const InterviewSchema = new mongoose.Schema(
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
      enum: ["online", "onsite", "phone"],
      default: "online",
    },
    location: {
      type: String,
    },
    notes: {
      type: String,
    },
    job: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

InterviewSchema.index({ createdBy: 1, interviewAt: 1 })

export default mongoose.model("Interview", InterviewSchema)
