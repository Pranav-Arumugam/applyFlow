import { Router } from "express"
import {
  test,
  createJobFromApplyBuddy,
} from "../controllers/applyBuddyController.js"
import { validateJobFromApplyBuddy } from "../middleware/validationMiddleware.js"
const router = Router()

router
  .route("/")
  .get(test)
  .post(validateJobFromApplyBuddy, createJobFromApplyBuddy)

export default router
