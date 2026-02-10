import { StatusCodes } from "http-status-codes"
import Job from "../models/JobModel.js"
import { extractSkillsByFrequency, analyseJobFit } from "../utils/analyzeJD.js"
import User from "../models/UserModel.js"

export const test = async (req, res) => {
  // Placeholder for applyBuddy functionality
  res.status(StatusCodes.NOT_IMPLEMENTED).json({ msg: "Testing Route" })
}

export const createJobFromApplyBuddy = async (req, res) => {
  console.log(req.user)
  const userId = req.user.userId
  const user = await User.findById(userId)
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "User not found" })
  }

  const existingJob = await Job.findOne({
    jobUrl: req.body.jobUrl,
    createdBy: userId,
  })

  const { jobDescription = "" } = req.body
  const requiredSkills = extractSkillsByFrequency(
    jobDescription,
    user.skills || [],
  )

  const {
    matchedSkills,
    missingSkills,
    matchScore,
    totalRequired,
    totalMatched,
  } = analyseJobFit(requiredSkills, user.skills || [])

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
        requiredSkills,
        matchedSkills,
        missingSkills,
        matchScore,
        totalRequired,
        totalMatched,
        createdBy: userId,
      },
      { new: true },
    )
    return res.status(StatusCodes.OK).json({ job: updatedJob, created: false })
  } else if (existingJob && !isChanged) {
    console.log("no change detected, returning existing job")
    return res.status(StatusCodes.OK).json({ job: existingJob, created: false })
  }

  const job = await Job.create({
    ...req.body,
    requiredSkills,
    matchedSkills,
    missingSkills,
    matchScore,
    totalRequired,
    totalMatched,
    createdBy: userId,
  })

  res.status(StatusCodes.CREATED).json({ job, created: true })
}
