import { NotFoundError } from "../errors/customError.js"
import Job from "../models/JobModel.js"
import User from "../models/UserModel.js"
import { StatusCodes } from "http-status-codes"
import mongoose from "mongoose"
import { extractSkillsByFrequency, analyseJobFit } from "../utils/analyzeJD.js"
import day from "dayjs"

export const getAllJobs = async (req, res) => {
  // console.log(req.query)
  // // const { userId, role } = req.user
  // const term = req.query.search.toLowerCase().trim()
  // console.log(term)
  const { search, status, type, page = 1, limit = 10, sort } = req.query
  const queryObject = { createdBy: req.user.userId }

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
  const sortKey = sortObject[sort] || sortObject.newest

  const pageNumber = Math.max(1, parseInt(page))
  const limitNumber = Math.max(1, Math.min(50, parseInt(limit)))
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

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId
  const userId = req.user.userId
  const user = await User.findById(userId)
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "User not found" })
  }
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

export const getJob = async (req, res) => {
  const { id } = req.params
  const job = await Job.findById(id)
  // console.log(job.createdBy)
  res.status(StatusCodes.OK).json({ job })
}

export const updateJob = async (req, res) => {
  const { id } = req.params
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true })
  res
    .status(StatusCodes.OK)
    .json({ msg: "Job has been updated", job: updatedJob })
}

export const deleteJob = async (req, res) => {
  const { id } = req.params
  const removedJob = await Job.findByIdAndDelete(id)

  res.status(200).json({ removedJob })
}

export const showStats = async (req, res) => {
  const totalJobs = await Job.countDocuments({ createdBy: req.user.userId })
  const recentApplications = await Job.find({ createdBy: req.user.userId })
    .sort("-createdAt")
    .limit(3)
  // console.log(stats)
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ])
  stats = stats.reduce((acc, cur) => {
    const { _id: title, count } = cur
    acc[title] = count
    return acc
  }, {})
  // console.log(stats)
  const defaultStatus = {
    total: totalJobs || 0,
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    accepted: stats.accepted || 0,
    rejected: stats.rejected || 0,
  }
  // console.log("from backend :", defaultStatus)

  let monthStats = await Job.aggregate([
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

  monthStats = monthStats
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

export const applyBuddy = async (req, res) => {
  // Placeholder for applyBuddy functionality
  res.status(StatusCodes.NOT_IMPLEMENTED).json({ msg: "Not implemented yet" })
}
