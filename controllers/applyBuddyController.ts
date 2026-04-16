import { StatusCodes } from "http-status-codes"
import JobModel, { Job, JobDoc } from "../models/JobModel.js"
import { extractSkillsByFrequency, analyseJobFit } from "../utils/analyzeJD.js"
import User from "../models/UserModel.js"
import { Request, Response } from "express"
import { NotFoundError, UnauthenticatedError } from "../errors/customError.js"
import { createJobRequestBody } from "../types/index.js"

export const test = async (req: Request, res: Response) => {
  // Placeholder for applyBuddy functionality
  res.status(StatusCodes.NOT_IMPLEMENTED).json({ msg: "Testing Route" })
}

export const createJobFromApplyBuddy = async (
  req: Request,
  res: Response,
): Promise<void | Response> => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")

  const userId = req.user.userId

  const body = req.body as createJobRequestBody

  const user = await User.findById(userId)
  if (!user) throw new NotFoundError("User not found")

  const existingJob = await JobModel.findOne<JobDoc>({
    jobUrl: body.jobUrl,
    createdBy: userId,
  })

  const { jobDescription = "" } = body
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

  const fieldsToCheck: Array<keyof Job> = [
    "company",
    "position",
    "jobLocation",
    "jobDescription",
    "jobMode",
    "jobType",
  ]

  const isChanged = existingJob
    ? fieldsToCheck.some((field) => {
        return req.body[field] !== existingJob.toObject()[field]
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
    const cleanBody = Object.fromEntries(
      Object.entries(body).filter(([_, v]) => v !== ""),
    )

    const updatedJob = await JobModel.findByIdAndUpdate(
      existingJob._id,
      {
        ...cleanBody,
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
    if (!updatedJob) throw new NotFoundError("Job not found during update")
    return res.status(StatusCodes.OK).json({ job: updatedJob, created: false })
  } else if (existingJob && !isChanged) {
    console.log("no change detected, returning existing job")
    return res.status(StatusCodes.OK).json({ job: existingJob, created: false })
  }

  const cleanBody = Object.fromEntries(
    Object.entries(body).filter(([_, v]) => v !== ""),
  )

  const job = await JobModel.create({
    ...cleanBody,
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
