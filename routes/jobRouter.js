import { Router } from "express"
import {
  validateIdInput,
  validateJobInput,
} from "../middleware/validationMiddleware.js"
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  updateJob,
  showStats,
} from "../controllers/jobController.js"

const router = Router()

router.route("/").get(getAllJobs).post(validateJobInput, createJob)
router.route("/stats").get(showStats)
router
  .route("/:id")
  .get(validateIdInput, getJob)
  .patch(validateIdInput, updateJob)
  .delete(validateIdInput, deleteJob)

export default router
