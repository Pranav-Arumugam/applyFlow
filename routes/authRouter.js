import { Router } from "express"
import { login, Logout, register } from "../controllers/authController.js"
import {
  validateLoginInput,
  validateRegisterUser,
} from "../middleware/validationMiddleware.js"
const router = Router()

router.post("/register", validateRegisterUser, register)
router.post("/login", validateLoginInput, login)
router.post("/logout", Logout)

export default router
