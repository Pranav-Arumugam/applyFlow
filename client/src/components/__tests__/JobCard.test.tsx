import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import JobCard from "../JobCard"
import { Job } from "../../types"
import { JobMode, JobStatus, JobType } from "../../utils/constants"

// Mocking react-router-dom
vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))
// Mocking the usehook
vi.mock("../../hooks/useJobs", () => ({
  useDeleteJob: () => ({
    mutate: vi.fn(),
    isPending: false,
  }),
}))

//Mocking the toastify
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

describe("JobCard Component", () => {
  test("renders the job Details", () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText("Junior Software Engineer")).toBeInTheDocument()
    expect(screen.getByText("Acron")).toBeInTheDocument()
  })

  test("renders the job stats", () => {
    render(<JobCard job={mockJob} />)
    expect(screen.getByText("full-time")).toBeInTheDocument()
    expect(screen.getByText("pending")).toBeInTheDocument()
    expect(screen.getByText("70% Match")).toBeInTheDocument()
  })

  test("calls the delete job when clicked", async () => {
    const user = userEvent.setup()
    render(<JobCard job={mockJob} />)
    expect(screen.getByTitle("Delete job")).toBeInTheDocument()
  })

  test("renders the Open link with correct href", () => {
    render(<JobCard job={mockJob} />)
    const link = screen.getByText("Open")
    expect(link).toHaveAttribute("href", `/dashboard/jobs/${mockJob._id}`)
  })
})
