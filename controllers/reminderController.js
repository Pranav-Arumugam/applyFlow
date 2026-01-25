import { StatusCodes } from "http-status-codes"
import Reminder from "../models/ReminderModel.js"
import User from "../models/UserModel.js"

export const getUpcomingReminders = async (req, res) => {
  const startOfTody = new Date()
  startOfTody.setHours(0, 0, 0, 0)
  const reminders = await Reminder.find({
    createdBy: req.user.userId,
    isCompleted: false,
    dueAt: { $gte: startOfTody },
  }).sort("dueAt")
  res.status(StatusCodes.OK).json({ reminders })
}

export const createReminder = async (req, res) => {
  const userId = req.user.userId
  const user = await User.findById(userId)
  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "User not found" })
  }
  const reminder = await Reminder.create({ ...req.body, createdBy: userId })
  res.status(StatusCodes.OK).json({ reminder })
}

export const getReminderById = async (req, res) => {
  const { id } = req.params
  const reminder = await Reminder.findById(id)
  if (!reminder) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Reminder not found" })
  }
  res.status(StatusCodes.OK).json({ reminder })
}

export const updateReminder = async (req, res) => {
  res.status(StatusCodes.OK).send("update a reminder")
}

export const deleteReminder = async (req, res) => {
  res.status(StatusCodes.OK).send(" delete a reminder")
}
