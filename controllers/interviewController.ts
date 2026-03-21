import { StatusCodes } from "http-status-codes"
import Interview from "../models/InterviewModel.js"
import User from "../models/UserModel.js"
import mongoose from "mongoose"
import day from "dayjs"
import { Request, Response } from "express"
import { NotFoundError, UnauthenticatedError } from "../errors/customError.js"
import { InterviewMode, InterviewStatus } from "../utils/constants.js"
import {
  CreateInterviewBody,
  IdInterviewRequestParams,
} from "../types/index.js"

export const getAllInterviews = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")
  const interviews = await Interview.find({ createdBy: req.user.userId }).sort(
    "-interviewAt",
  )
  res.status(StatusCodes.OK).json({ interviews })
}

export const createInterview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")
  const userId = req.user.userId
  const user = await User.findById(userId)
  if (!user) throw new NotFoundError("User not found")

  const body = req.body as CreateInterviewBody
  const interview = await Interview.create({ ...body, createdBy: userId })
  res.status(StatusCodes.CREATED).json({ interview })
}

export const getInterviewById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")
  const param = req.params as IdInterviewRequestParams
  const { id } = param
  const interview = await Interview.findOne({
    _id: id,
    createdBy: req.user.userId,
  }).populate("job", "company position jobLocation")
  if (!interview) throw new NotFoundError("Interview not found")

  res.status(StatusCodes.OK).json({ interview })
}

export const getUpcomingInterview = async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")
  const now = new Date()
  const upcomingCount = await Interview.find({
    createdBy: req.user.userId,
    status: "upcoming",
    interviewAt: { $gte: now },
  })
    .sort("interviewAt")
    .populate("job", "company position jobLocation")

  res.status(StatusCodes.OK).json({ upcomingCount })
}
export const updateInterview = async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")
  const param = req.params as IdInterviewRequestParams
  const { id } = param
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

export const deleteInterview = async (req: Request, res: Response) => {
  if (!req.user) throw new UnauthenticatedError("User not authenticated")
  const param = req.params as IdInterviewRequestParams
  const { id } = param

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

type monthlyInterviewAgg = {
  _id: {
    year: number
    month: number
  }
  count: number
}

type MonthlyInterview = {
  date: string
  count: number
}

export const showStats = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) throw new UnauthenticatedError("User not  authenticated")
  const now = new Date()
  let monthlyInterview: MonthlyInterview[] = (
    await Interview.aggregate<monthlyInterviewAgg>([
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
  ).map((item: monthlyInterviewAgg) => {
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

  res.status(StatusCodes.OK).json({
    upcomingInterview,
    monthlyInterview,
  })
}
