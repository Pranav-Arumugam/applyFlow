import { hashPassword, checkPassword } from "../hashPassword.js"

describe("testing hashPassword function", () => {
  test("should hash the string into a different string", async () => {
    const password = "mysecretpassword"
    const hashed = await hashPassword(password)
    expect(hashed).not.toBe(password)
  })

  test("should return a string of lenght greater than 10", async () => {
    const password = "mysecretpassword"
    const hashed = await hashPassword(password)
    expect(typeof hashed).toBe("string")
    expect(hashed.length).toBeGreaterThan(10)
  })

  test("should return a different hash for the same password", async () => {
    const password = "mysecretpassword"
    const hashed1 = await hashPassword(password)
    const hashed2 = await hashPassword(password)
    expect(hashed1).not.toBe(hashed2)
  })
})

describe("testing checkPassword function", () => {
  const password = "mysecretpassword"
  let hashedPassword: string = ""

  beforeAll(async () => {
    hashedPassword = await hashPassword(password)
  })

  test("should return true of correct password", async () => {
    const isMatch = await checkPassword(password, hashedPassword)
    expect(isMatch).toBe(true)
  })

  test("should return false for incorrect password", async () => {
    const isMatch = await checkPassword("wrongpassword", hashedPassword)
    expect(isMatch).toBe(false)
  })
})
