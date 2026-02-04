import { Router } from "express"
import { applyBuddy } from "../controllers/applyBuddyController.js"

const router = Router()

router.route("/").get(applyBuddy)

export default router
