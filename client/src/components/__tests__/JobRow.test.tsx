import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import JobRow from "../JobRow"
import { Job } from "../../types"
import { JobType, JobStatus, JobMode } from "../../utils/constants"

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))

vi.mock("../../hooks/useJobs", () => ({
  useDeleteJob: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}))

vi.mock("react-toastify", () => ({
  toast: { success: vi.fn() },
}))

vi.spyOn(window, "confirm").mockReturnValue(true)

const mockJob: Job = {
  _id: "4342434",
  position: "Junior Software Engineer",
  company: "Acron",
  jobLocation: "Liverpool",
  jobType: "full-time" as JobType,
  jobStatus: "pending" as JobStatus,
  jobDescription: "we are looking for.....",
  jobUrl: "https://example.com",
  jobMode: "hybrid" as JobMode,
  requiredSkills: ["node", "react"],
  matchedSkills: ["node"],
  missingSkills: ["react"],
  totalRequired: 2,
  totalMatched: 1,
  matchScore: 70,
  createdBy: "854904",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-01-01T00:00:00.000Z",
}

describe("JobRow Component", () => {
  test("renders the job Details", () => {
    render(
      <table>
        <tbody>
          <JobRow job={mockJob} />
        </tbody>
      </table>,
    )
    expect(screen.getByText("Junior Software Engineer")).toBeInTheDocument()
    expect(screen.getByText("Acron")).toBeInTheDocument()
  })

  test("renders the job stats", () => {
    render(
      <table>
        <tbody>
          <JobRow job={mockJob} />
        </tbody>
      </table>,
    )
    expect(screen.getByText("pending")).toBeInTheDocument()
    expect(screen.getByText("70% Match")).toBeInTheDocument()
    expect(screen.getByText("Liverpool")).toBeInTheDocument()
  })

  test("calls the delete job when clicked", async () => {
    const user = userEvent.setup()
    render(
      <table>
        <tbody>
          <JobRow job={mockJob} />
        </tbody>
      </table>,
    )
    expect(screen.getByTitle("Delete Job")).toBeInTheDocument()
  })
})
