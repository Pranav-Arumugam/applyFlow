import { body, param, validationResult } from "express-validator"
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/customError.js"
import { JOB_STATUS, JOB_TYPES, JOB_MODE } from "../utils/constants.js"
import Job from "../models/JobModel.js"
import User from "../models/UserModel.js"
import mongoose from "mongoose"

const validateError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg)
        if (errorMessages[0].includes("no job")) {
          throw new NotFoundError(errorMessages)
        }
        if (errorMessages[0].includes("Sorry not")) {
          throw new UnauthenticatedError(errorMessages)
        }
        throw new BadRequestError(errorMessages)
      }
      next()
    },
  ]
}

export const validateJobInput = validateError([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPES))
    .withMessage("Invalid type value"),
  body("jobDescription").notEmpty().withMessage("job description is required"),
])

export const validateIdInput = validateError([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value)
    if (!isValidId) throw new BadRequestError("invalid MongoDB id")
    //checking the exsistence of the job
    const job = await Job.findById(value)
    if (!job) throw new NotFoundError(`no job with id ${value}`)
    // console.log(req)
    const isAdmin = req.user.role === "admin"
    const isOwner = req.user.userId === job.createdBy.toString()

    //checking for the ownership of the data requested .
    if (!isAdmin && !isOwner) {
      throw new UnauthenticatedError(
        "Sorry not authorized to access this route",
      )
    }
  }),
])

export const validateRegisterUser = validateError([
  body("name").notEmpty().withMessage("name is a required field"),
  body("email")
    .notEmpty()
    .withMessage("email is a required field")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      //checking if the email already exists in the DB
      const user = await User.findOne({ email })
      if (user) throw new BadRequestError("email already exists")
    }),
  body("password")
    .notEmpty()
    .withMessage("password is a required field")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 character long"),
  body("lastName").notEmpty().withMessage("last name is a required field"),
  body("location").notEmpty().withMessage("location is a required field"),
])

export const validateLoginInput = validateError([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email "),
  body("password").notEmpty().withMessage("password is required"),
])

export const validateUpdateUser = validateError([
  body("name").notEmpty().withMessage("name is a required field"),
  body("email")
    .notEmpty()
    .withMessage("email is a required field")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      //checking if the email already exists in the DB
      const user = await User.findOne({ email })
      if (user && user._id.toString() !== req.user.userId)
        throw new BadRequestError("email already exists")
    }),
  body("lastName").notEmpty().withMessage("last name is a required field"),
  body("location").notEmpty().withMessage("location is a required field"),
])

export const validateReminderInput = validateError([
  body("title").notEmpty().withMessage("title is requried field"),
  body("description").notEmpty().withMessage("Description is required field"),
  body("dueAt").notEmpty().withMessage("Due date is required"),
  body("priority").notEmpty().withMessage("Priority is required"),
])

export const validateReminderUpdate = validateError([
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),

  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),

  body("dueAt")
    .optional()
    .notEmpty()
    .withMessage("Due date cannot be empty")
    .bail()
    .isISO8601()
    .withMessage("Due date must be a valid date"),

  body("priority")
    .optional()
    .notEmpty()
    .withMessage("Priority cannot be empty")
    .bail()
    .isIn(["low", "medium", "high"])
    .withMessage("Priority must be low, medium, or high"),
])

export const validateInterviewInput = validateError([
  body("company")
    .notEmpty()
    .withMessage("Company is a required field")
    .isString()
    .withMessage("Company must be a string"),

  body("position")
    .notEmpty()
    .withMessage("Position is a required field")
    .isString()
    .withMessage("Position must be a string"),

  body("interviewAt")
    .notEmpty()
    .withMessage("Interview date/time is required")
    .bail()
    .isISO8601()
    .withMessage("Interview date/time must be a valid ISO date"),

  body("mode")
    .optional()
    .notEmpty()
    .withMessage("Mode cannot be empty")
    .bail()
    .isIn(["online", "onsite", "phone"])
    .withMessage("Mode must be one of: online, onsite, phone"),

  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),

  body("notes").optional().isString().withMessage("Notes must be a string"),

  body("job").optional().isMongoId().withMessage("Job must be a valid job id"),

  body("status")
    .optional()
    .notEmpty()
    .withMessage("Status cannot be empty")
    .bail()
    .isIn(["upcoming", "completed", "cancelled"])
    .withMessage("Status must be one of: upcoming, completed, cancelled"),
])

export const validateInterviewUpdate = validateError([
  body("company")
    .optional()
    .notEmpty()
    .withMessage("Company cannot be empty")
    .bail()
    .isString()
    .withMessage("Company must be a string"),

  body("position")
    .optional()
    .notEmpty()
    .withMessage("Position cannot be empty")
    .bail()
    .isString()
    .withMessage("Position must be a string"),

  body("interviewAt")
    .optional()
    .notEmpty()
    .withMessage("Interview date/time cannot be empty")
    .bail()
    .isISO8601()
    .withMessage("Interview date/time must be a valid ISO date"),

  body("mode")
    .optional()
    .notEmpty()
    .withMessage("Mode cannot be empty")
    .bail()
    .isIn(["online", "onsite", "phone"])
    .withMessage("Mode must be one of: online, onsite, phone"),

  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string"),

  body("notes").optional().isString().withMessage("Notes must be a string"),

  body("job").optional().isMongoId().withMessage("Job must be a valid job id"),

  body("status")
    .optional()
    .notEmpty()
    .withMessage("Status cannot be empty")
    .bail()
    .isIn(["upcoming", "completed", "cancelled"])
    .withMessage("Status must be one of: upcoming, completed, cancelled"),
])

export const validateJobFromApplyBuddy = validateError([
  body("company")
    .trim()
    .notEmpty()
    .withMessage("company is required")
    .isLength({ max: 200 })
    .withMessage("company name must be less than 200 characters"),
  body("position").trim().notEmpty().withMessage("Position is required"),
  body("jobLocation")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("job location is required"),
  body("jobDescription")
    .trim()
    .notEmpty()
    .withMessage("job description is required"),
  body("jobUrl")
    .trim()
    .isURL()
    .notEmpty()
    .withMessage("job url is required")
    .custom((value) => {
      if (!value.match(/linkedin\.com\/jobs\/view\/\d+/)) {
        throw new Error("Must be a LinkedIn job URL")
      }
      return true
    }),
  body("jobMode")
    .optional({ values: "falsy" })
    .customSanitizer((value) => value?.toLowerCase().trim())
    .isIn(Object.values(JOB_MODE))
    .withMessage(
      `job mongoose must be one of: ${Object.values(JOB_MODE).join(", ")}`,
    ),
  body("jobType")
    .optional()
    .customSanitizer((value) => value?.toLowerCase().trim())
    .isIn(Object.values(JOB_TYPES))
    .withMessage(
      `job type must be one of: ${Object.values(JOB_TYPES).join(", ")}`,
    ),
])
