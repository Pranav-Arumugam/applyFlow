import { StatusCodes } from "http-status-codes"
import User from "../models/UserModel.js"
import Job from "../models/JobModel.js"
import { extractSkillsByFrequency, analyseJobFit } from "../utils/analyzeJD.js"

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  const nonSensitiveData = user.toJSON()
  res.status(StatusCodes.OK).json({ user: nonSensitiveData })
}

export const getApplicationStats = async (req, res) => {
  const totalApp = await Job.countDocuments({ createdBy: req.user.userId })
  const accepted = await Job.countDocuments({
    createdBy: req.user.userId,
    jobStatus: "accepted",
  })
  const declined = await Job.countDocuments({
    createdBy: req.user.userId,
    jobStatus: "declined",
  })
  const interview = await Job.countDocuments({
    createdBy: req.user.userId,
    jobStatus: "interview",
  })
  const jobs = await Job.find({ createdBy: req.user.userId })
  res.status(StatusCodes.OK).json({ accepted, declined, interview })
}

export const updateUser = async (req, res) => {
  const { password, ...data } = req.body
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, data, {
    new: true,
    runValidators: true,
  })

  if (data.skills) {
    try {
      const userJobs = await Job.find({ createdBy: req.user.userId })
      console.log(`Recalculating match scores for ${userJobs.length} jobs...`)

      const updatePromises = userJobs.map(async (job) => {
        const requiredSkills = extractSkillsByFrequency(
          job.jobDescription || "",
          updatedUser.skills || [],
        )

        const {
          matchedSkills,
          missingSkills,
          matchScore,
          totalRequired,
          totalMatched,
        } = analyseJobFit(requiredSkills, updatedUser.skills || [])

        return Job.findByIdAndUpdate(
          job._id,
          {
            requiredSkills,
            matchedSkills,
            missingSkills,
            matchScore,
            totalRequired,
            totalMatched,
          },
          { new: true },
        )
      })
      await Promise.all(updatePromises)

      console.log(`Successfully recalculated ${userJobs.length} job matches`)
    } catch (error) {
      console.error("Error recalculating job matches:", error)
    }
  }
  const nonSensitiveData = updatedUser.toJSON()
  res.status(StatusCodes.OK).json({
    user: nonSensitiveData,
    msg: "User updated",
  })
}
