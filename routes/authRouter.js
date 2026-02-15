import { Router } from "express"
import {
  login,
  Logout,
  register,
  getAuthStatus,
} from "../controllers/authController.js"
import {
  validateLoginInput,
  validateRegisterUser,
} from "../middleware/validationMiddleware.js"
import { authenticateUser } from "../middleware/authMiddleware.js"
const router = Router()

router.post("/register", validateRegisterUser, register)
router.post("/login", validateLoginInput, login)
router.post("/logout", Logout)
router.get("/status", authenticateUser, getAuthStatus)

export default router
