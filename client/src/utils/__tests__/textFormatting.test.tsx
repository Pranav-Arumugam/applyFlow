import { expect, test } from "vitest"

import { getRelativeTime } from "../textFormatting"

test("returns 2 days ago", () => {
  const twoDaysAgo = new Date()
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
  twoDaysAgo.setHours(0, 0, 0, 0)
  const result = getRelativeTime(twoDaysAgo.toISOString())
  expect(result).toBe("2 days ago")
})
