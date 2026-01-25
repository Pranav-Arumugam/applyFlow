import { Router } from "express"
import {
  createReminder,
  deleteReminder,
  getReminderById,
  getUpcomingReminders,
  updateReminder,
} from "../controllers/reminderController.js"
import { validateReminderInput } from "../middleware/validationMiddleware.js"
import { validateReminderUpdate } from "./../middleware/validationMiddleware.js"
const router = Router()

router
  .route("/")
  .get(getUpcomingReminders)
  .post(validateReminderInput, createReminder)
router
  .route("/:id")
  .get(getReminderById)
  .patch(validateReminderUpdate, updateReminder)
  .delete(deleteReminder)

export default router
