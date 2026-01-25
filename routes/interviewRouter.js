import { Router } from "express"
import {
  createInterview,
  deleteInterview,
  getAllInterviews,
  getInterviewById,
  updateInterview,
  getUpcomingInterview,
  showStats,
} from "../controllers/interviewController.js"
import {
  validateInterviewInput,
  validateInterviewUpdate,
} from "../middleware/validationMiddleware.js"
import { authenticateUser } from "./../middleware/authMiddleware.js"
const router = Router()

router
  .route("/")
  .get(authenticateUser, getAllInterviews)
  .post(authenticateUser, validateInterviewInput, createInterview)

router.route("/upcoming").get(authenticateUser, showStats)

router
  .route("/:id")
  .get(authenticateUser, getInterviewById)
  .patch(authenticateUser, validateInterviewUpdate, updateInterview)
  .delete(authenticateUser, deleteInterview)

export default router
