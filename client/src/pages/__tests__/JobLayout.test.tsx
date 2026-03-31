import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import JobsLayout from "../JobsLayout"
import { useGetAllJobs } from "../../hooks/useJobs"
import { Job } from "../../types"
import { JobMode, JobStatus, JobType } from "../../utils/constants"

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

vi.mock("../../hooks/useJobs", () => ({
  useGetAllJobs: vi.fn(),
}))

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))

vi.mock("../../components/LoadingDots", () => ({
  default: () => <div data-testid='loading-dots' />,
}))

vi.mock("../../components/JobsFilter", () => ({
  default: () => <div data-testid='jobs-filter' />,
}))

vi.mock("../../components/JobCard", () => ({
  default: ({ job }: { job: { position: string } }) => (
    <div data-testid='job-card'>{job.position}</div>
  ),
}))

vi.mock("../../components/JobRow", () => ({
  default: ({ job }: { job: { position: string } }) => (
    <div data-testid='job-row'>{job.position}</div>
  ),
}))

describe("JobLayout page tests", () => {
  test("Loading state test", () => {
    vi.mocked(useGetAllJobs).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    } as any)
    render(<JobsLayout></JobsLayout>)
    expect(screen.getByTestId("loading-dots")).toBeInTheDocument()
  })

  test("Error State Test", () => {
    vi.mocked(useGetAllJobs).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("Failed to load"),
    } as any)

    render(<JobsLayout></JobsLayout>)
    expect(screen.getByText("Failed to load")).toBeInTheDocument()
  })

  test("Empty state test", () => {
    vi.mocked(useGetAllJobs).mockReturnValue({
      data: { jobs: [], pagination: undefined },
      isLoading: false,
      error: null,
    } as any)
    render(<JobsLayout></JobsLayout>)
    expect(screen.getByText("No jobs yet")).toBeInTheDocument()
  })

  test("renders jobs when data is available", () => {
    vi.mocked(useGetAllJobs).mockReturnValue({
      data: { jobs: [mockJob], pagination: undefined },
      isLoading: false,
      error: null,
    } as any)
    render(<JobsLayout />)
    expect(screen.getByTestId("job-row")).toBeInTheDocument()
  })

  test("renders pagination when totalPages > 1", () => {
    vi.mocked(useGetAllJobs).mockReturnValue({
      data: {
        jobs: [mockJob],
        pagination: {
          page: 1,
          totalPages: 3,
          totalJobs: 25,
          limit: 10,
          hasNextPage: true,
          hasPrevPage: false,
        },
      },
    } as any)
    render(<JobsLayout />)
    expect(screen.getByText("Page 1 of 3")).toBeInTheDocument()
  })
})
