import { JobFormData } from "../types"
import { JOB_MODE, JOB_STATUS, JOB_TYPES } from "./constants"

const EMPTY_JOB: JobFormData = {
  company: "",
  position: "",
  jobLocation: "",
  jobStatus: JOB_STATUS.PENDING,
  jobType: JOB_TYPES.FULLTIME,
  jobMode: JOB_MODE.HYBRID,
  jobDescription: "",
  jobUrl: "",
}
export const getEmptyJob = () => ({ ...EMPTY_JOB })
