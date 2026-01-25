import { Router } from "express"
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/userController.js"
import { validateUpdateUser } from "../middleware/validationMiddleware.js"
import { authenticateUser } from "./../middleware/authMiddleware.js"
const router = Router()

router.get("/current-user", authenticateUser, getCurrentUser)
router.get("/app-stats", authenticateUser, getApplicationStats)
router.patch("/update-user", authenticateUser, validateUpdateUser, updateUser)

export default router
