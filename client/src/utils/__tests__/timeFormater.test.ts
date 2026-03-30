import { expect, test } from "vitest"
import { formatShortDate, timeFormatter } from "../timeFormater"

describe("time formater function", () => {
  test("returns the right date and time format", () => {
    const obj = timeFormatter("2026-01-01T00:00:00.000Z")
    expect(obj.date).toBe("January 1, 2026")
    expect(obj.time).toBe("12:00 AM")
  })

  test("testing format short date", () => {
    const date = new Date().toISOString()
    const dateString = formatShortDate(date)
    expect(dateString).toBe("Today")
  })
})
