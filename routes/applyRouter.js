import { Router } from "express"
import { applyBuddy } from "../controllers/jobController"

const router = Router()

router.route("/").get(applyBuddy)

export default router
