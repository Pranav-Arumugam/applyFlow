import { StatusCodes } from "http-status-codes"
import Job from "../models/JobModel.js"

export const test = async (req, res) => {
  // Placeholder for applyBuddy functionality
  res.status(StatusCodes.NOT_IMPLEMENTED).json({ msg: "Testing Route" })
}

export const createJobFromApplyBuddy = async (req, res) => {
  const userId = "697721429eeef7aca92bff38" // Placeholder user ID

  const existingJob = await Job.findOne({
    jobUrl: req.body.jobUrl,
    createdBy: userId,
  })

  const fieldsToCheck = [
    "company",
    "position",
    "jobLocation",
    "jobDescription",
    "jobMode",
    "jobType",
  ]

  const isChanged = existingJob
    ? fieldsToCheck.some((key) => {
        return req.body[key] !== existingJob.toObject()[key]
      })
    : false

  // console.log("Existing job:", existingJob.toObject())
  // console.log("Request body:", req.body)
  // console.log("Keys being compared:", Object.keys(req.body))

  // Object.keys(req.body).forEach((key) => {
  //   console.log(`${key}:`, {
  //     existing: existingJob[key],
  //     incoming: req.body[key],
  //     different: existingJob[key] !== req.body[key],
  //   })
  // })

  if (existingJob && isChanged) {
    console.log("change detected, updating existing job")
    const updatedJob = await Job.findByIdAndUpdate(
      existingJob._id,
      {
        ...req.body,
        jobUrl: existingJob.jobUrl, // Ensure jobUrl remains unchanged
        createdBy: userId,
      },
      { new: true },
    )
    return res.status(StatusCodes.OK).json({ job: updatedJob, created: false })
  } else if (existingJob && !isChanged) {
    console.log("no change detected, returning existing job")
    return res.status(StatusCodes.OK).json({ job: existingJob, created: false })
  }

  const job = await Job.create({ ...req.body, createdBy: userId })

  res.status(StatusCodes.CREATED).json({ job, created: true })
}
