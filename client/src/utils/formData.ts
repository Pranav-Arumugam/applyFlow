const EMPTY_JOB = {
  company: "",
  position: "",
  jobLocation: "",
  jobStatus: "",
  jobType: "",
  jobDescription: "",
  jobUrl: "",
}
export const getEmptyJob = () => ({ ...EMPTY_JOB })
