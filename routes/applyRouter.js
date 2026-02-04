import { Route } from "express"
import router from "./reminderRouter"
import { applyBuddy } from "../controllers/jobController"

const router = Route()

router.route("/").get(applyBuddy)

export default router
