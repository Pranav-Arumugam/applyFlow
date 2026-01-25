import { StatusCodes } from "http-status-codes"
import Interview from "../models/InterviewModel.js"
import User from "../models/UserModel.js"
import mongoose from "mongoose"
import day from "dayjs"
export const getAllInterviews = async (req, res) => {
  const interviews = await Interview.find({ createdBy: req.user.userId }).sort(
    "-interviewAt",
  )
  return res.status(StatusCodes.OK).json({ interviews })
}

export const createInterview = async (req, res) => {
  const userId = req.user.userId
  const user = await User.findById(userId)
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "User not found" })
  }
  const interview = await Interview.create({ ...req.body, createdBy: userId })
  res.status(StatusCodes.CREATED).json({ interview })
}

export const getInterviewById = async (req, res) => {
  const { id } = req.params
  const interview = await Interview.findOne({
    _id: id,
    createdBy: req.user.userId,
  }).populate("job", "company position jobLocation")
  if (!interview) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Interview not found" })
  }

  return res.status(StatusCodes.OK).json({ interview })
}

export const getUpcomingInterview = async (req, res) => {
  const now = new Date()
  const upcomingCount = await Interview.find({
    createdBy: req.user.userId,
    status: "upcoming",
    interviewAt: { $gte: now },
  })
    .sort("interviewAt")
    .populate("job", "company position jobLocation")

  res.status(StatusCodes.OK).json({ interviews })
}
export const updateInterview = async (req, res) => {
  const { id } = req.params
  const interview = await Interview.findOneAndUpdate(
    {
      _id: id,
      createdBy: req.user.userId,
    },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )
  if (!interview) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Interview not found" })
  }

  return res.status(StatusCodes.OK).json({ interview })
}

export const deleteInterview = async (req, res) => {
  const { id } = req.params

  const interview = await Interview.findOneAndDelete({
    _id: id,
    createdBy: req.user.userId,
  })

  if (!interview) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: "Interview not found" })
  }

  return res.status(StatusCodes.OK).json({ msg: "Interview deleted" })
}

export const showStats = async (req, res) => {
  const now = new Date()
  let monthlyInterview = await Interview.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: {
          year: { $year: "$interviewAt" },
          month: { $month: "$interviewAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ])

  monthlyInterview = monthlyInterview.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item
    const date = day()
      .month(month - 1)
      .year(year)
      .format("MMM YY")
    return { date, count }
  })

  const upcomingInterview = await Interview.find({
    createdBy: req.user.userId,
    status: "upcoming",
    interviewAt: { $gte: now },
  })
    .sort("interviewAt")
    .populate("job", "company position jobLocation")
  return res.status(StatusCodes.OK).json({
    upcomingInterview,
    monthlyInterview,
  })
}
