import mongoose from "mongoose"
const ReminderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    dueAt: {
      type: Date,
      required: true,
    },
    job: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

ReminderSchema.index({ createdBy: 1, dueAt: 1 })

export default mongoose.model("Reminder", ReminderSchema)
