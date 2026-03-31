import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { JobFormData } from "../../types"
import { JOB_STATUS, JOB_MODE, JOB_TYPES } from "./../../utils/constants"
import JobForm from "../JobForm"

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

const filledJob: JobFormData = {
  company: "Google",
  position: "Software Engineer",
  jobLocation: "London, UK",
  jobStatus: JOB_STATUS.PENDING,
  jobType: JOB_TYPES.FULLTIME,
  jobMode: JOB_MODE.HYBRID,
  jobDescription: "We are looking for...",
  jobUrl: "https://google.com",
}

const defaultProps = {
  initialValue: EMPTY_JOB,
  onSubmit: vi.fn(), // just a mock function
  submitting: false, // boolean value
  title: "Add Job", // colon not equals
  submitLabel: "Save",
}

describe("Job form tests", () => {
  test("renders the form title", () => {
    render(<JobForm {...defaultProps} />)
    expect(screen.getByText("Add Job")).toBeInTheDocument()
  })
  test("renders empty field", () => {
    render(<JobForm {...defaultProps} />)
    expect(screen.getByPlaceholderText("Company name")).toHaveValue("")
    expect(screen.getByPlaceholderText("Job role")).toHaveValue("")
    expect(screen.getByLabelText("Location")).toHaveValue("")
    expect(screen.getByLabelText("Job Listing Url")).toHaveValue("")
    expect(screen.getByLabelText("Job Description")).toHaveValue("")
    expect(screen.getByLabelText("Job type")).toHaveValue("full-time")
    expect(screen.getByLabelText("Status")).toHaveValue("pending")
  })

  test("renders the right button", () => {
    render(<JobForm {...defaultProps} />)
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })

  test("value into the field", async () => {
    render(<JobForm {...defaultProps} />)
    const user = userEvent.setup()
    const input = screen.getByPlaceholderText("Company name")
    await user.type(input, "Google")
    expect(input).toHaveValue("Google")
  })

  test("renders pre-filled values in edit mode", () => {
    render(
      <JobForm {...defaultProps} initialValue={filledJob} title='Edit Job' />,
    )
    expect(screen.getByText("Edit Job")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Company name")).toHaveValue("Google")
    expect(screen.getByPlaceholderText("Job role")).toHaveValue(
      "Software Engineer",
    )
  })

  test("render Saving.....  when Submitting", () => {
    render(<JobForm {...defaultProps} submitting={true} />)
    expect(screen.getByRole("button", { name: /Saving/i })).toBeInTheDocument()
  })
})
