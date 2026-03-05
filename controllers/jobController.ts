import { NotFoundError, UnauthenticatedError } from "../errors/customError.js"
import Job from "../models/JobModel.js"
import User from "../models/UserModel.js"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import { extractSkillsByFrequency, analyseJobFit } from "../utils/analyzeJD.js"
import day from "dayjs"
import { Request, Response } from "express"
import { UserPayload } from "../types/index.js"

type queryObjectType = {
  createdBy: string
  jobStatus?: string
  jobType?: string
  $or?: Array<
    | { position?: { $regex: string; $options: string } }
    | { company?: { $regex: string; $options: string } }
  >
}

type RequestQuery = {
  search?: string
  status?: string
  type?: string
  page?: number
  limit?: number
  sort?: string
}

type createJobRequestBody = {
  position: string
  company: string
  jobLocation: string
  jobType: string
  jobStatus: string
  jobDescription: string
  jobUrl: string
  createdBy?: string
}

type IdJobRequestParams = {
  id: string
}

type updateJobRequestBody = Partial<createJobRequestBody>

type stats = {
  _id: string
  count: number
}

type monthStats = {
  _id: { year: number; month: number }
  count: number
}

type defaultStats = {
  total: number
  pending: number
  interview: number
  accepted: number
  rejected: number
}

export const getAllJobs = async (
  req: Request,
  res: Response,
): Promise<void> => {
  // console.log(req.query)
  // // const { userId, role } = req.user
  // const term = req.query.search.toLowerCase().trim()
  // console.log(term)
  if (!req.user) throw new UnauthenticatedError("User not authenticated")
  const {
    search,
    status,
    type,
    page = 1,
    limit = 10,
    sort,
  } = req.query as RequestQuery
  const queryObject: queryObjectType = { createdBy: req.user.userId }

  if (status && status !== "all") {
    queryObject.jobStatus = status
  }

  if (type && type !== "all") {
    queryObject.jobType = type
  }

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ]
  }

  const sortObject = {
    newest: "-createdAt",
    oldest: "createdAt",
    score: "-matchScore",
  }
  const sortKey = sortObject[sort ?? "newest"] ?? sortObject.newest

  const pageNumber = Math.max(1, parseInt(page.toString()))
  const limitNumber = Math.max(1, Math.min(50, parseInt(limit.toString())))
  const skip = (pageNumber - 1) * limitNumber

  // const jobs =
  //   term === ""
  //     ? await Job.find({ createdBy: req.user.userId })
  //     : await Job.find({
  //         createdBy: req.user.userId,
  //         position: term,
  //         company: term,
  //       })

  const totalJobs = await Job.countDocuments(queryObject)
  const totalPages = Math.ceil(totalJobs / limitNumber)
  const jobs = await Job.find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limitNumber)
  res.status(StatusCodes.OK).json({
    jobs,
    pagination: {
      page: pageNumber,
      limit: limitNumber,
      totalJobs,
      totalPages,
      hasNextPage: pageNumber < totalPages,
      hasPrevPage: pageNumber > 1,
    },
  })
}

export const createJob = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")
  const reqUser: UserPayload = req.user

  const body = req.body as createJobRequestBody

  body.createdBy = reqUser.userId

  const userId = req.user.userId
  const user = await User.findById(userId)
  if (!user) throw new NotFoundError("User not found")
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
  res.status(StatusCodes.CREATED).json({ job })
}

export const getJob = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")
  const reqUser: UserPayload = req.user
  const param = req.params as IdJobRequestParams
  const { id } = param
  const job = await Job.findById(id)
  // console.log(job.createdBy)
  res.status(StatusCodes.OK).json({ job })
}

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")
  const param = req.params as IdJobRequestParams
  const { id } = param
  const body = req.body as updateJobRequestBody
  const updatedJob = await Job.findByIdAndUpdate(id, body, { new: true })
  res
    .status(StatusCodes.OK)
    .json({ msg: "Job has been updated", job: updatedJob })
}

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  const param = req.params as IdJobRequestParams
  const { id } = param
  const removedJob = await Job.findByIdAndDelete(id)

  res.status(200).json({ removedJob })
}

export const showStats = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")

  const totalJobs = await Job.countDocuments({ createdBy: req.user.userId })
  const recentApplications = await Job.find({ createdBy: req.user.userId })
    .sort("-createdAt")
    .limit(3)
  // console.log(stats)
  let statsArray: stats[] = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ])
  let stats: Record<string, number> = statsArray.reduce((acc, cur) => {
    const { _id: title, count } = cur
    acc[title] = count
    return acc
  }, {})
  // console.log(stats)
  const defaultStatus: defaultStats = {
    total: totalJobs || 0,
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    accepted: stats.accepted || 0,
    rejected: stats.rejected || 0,
  }
  // console.log("from backend :", defaultStatus)

  let monthStatsArray: monthStats[] = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 3 },
  ])

  let monthStats = monthStatsArray
    .map((ele) => {
      const {
        _id: { year, month },
        count,
      } = ele

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY")

      return { date, count }
    })
    .reverse()
  res.send({ defaultStatus, monthStats, recentApplications })
}
