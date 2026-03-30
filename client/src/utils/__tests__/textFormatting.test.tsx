import { expect, test } from "vitest"

import { getRelativeTime } from "../textFormatting"

test("tesing the relative time function", () => {
  const twoDaysAgo = new Date()
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
  const result = getRelativeTime(twoDaysAgo.toISOString())
  expect(result).toBe("2 days ago")
})
