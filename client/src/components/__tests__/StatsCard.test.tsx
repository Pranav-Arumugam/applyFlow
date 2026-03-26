import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import StatsCard from "../StatsCard"

const defaultProps = {
  title: "Total Applications",
  value: 6,
  icon: <span>icon</span>,
  color: "blue" as const,
  trend: "Keep applying!",
  onClick: vi.fn(),
}

describe("StatsCard", () => {
  test("renders the title", () => {
    render(<StatsCard {...defaultProps} />)
    expect(screen.getByText("Total Applications")).toBeInTheDocument()
  })

  test("renders the value", () => {
    render(<StatsCard {...defaultProps} />)
    expect(screen.getByText("6")).toBeInTheDocument()
  })

  test("renders when value is zero", () => {
    render(<StatsCard {...defaultProps} value={0} />)
    expect(screen.getByText("0")).toBeInTheDocument()
  })

  test("renders the trend text", () => {
    render(<StatsCard {...defaultProps} />)
    expect(screen.getByText("Keep applying!")).toBeInTheDocument()
  })

  test("calls onClick when clicked", async () => {
    const user = userEvent.setup()
    render(<StatsCard {...defaultProps} />)
    await user.click(screen.getByText("Total Applications"))
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1)
  })
})
