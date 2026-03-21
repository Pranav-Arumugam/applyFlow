import { describe, test, expect, beforeAll, afterAll, afterEach } from "vitest"
import mongoose, { Types } from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

import User from "../UserModel.js"
import { USER_ROLES, UserRole } from "../../utils/constants.js"

let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  await mongoose.connect(mongo.getUri())
  await User.syncIndexes()
})

afterEach(async () => {
  const collections = await mongoose.connection.db.collections()
  for (const collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongo.stop()
})

const buildUser = (overrides: Record<string, unknown> = {}) => ({
  name: "Pranav",
  email: "pranav@test.com",
  password: "Passw0rd!",
  lastName: "A",
  location: "UK",
  role: "user",
  skills: [{ name: "TypeScript", years: 1 }],
  ...overrides,
})

describe("UserModel", () => {
  test("apply defaults", async () => {
    const user = await User.create(
      buildUser({
        lastName: undefined,
        location: undefined,
        role: undefined,
        skills: undefined,
      }) as any,
    )

    expect(user.lastName).toBe("LastName")
    expect(user.location).toBe("my Location")
    expect(user.role).toBe("user")
    expect(user.skills).toEqual([])

    expect(user.createdAt).toBeInstanceOf(Date)
    expect(user.updatedAt).toBeInstanceOf(Date)
  })

  test("requires name", async () => {
    await expect(
      User.create(buildUser({ name: undefined as any })),
    ).rejects.toThrow()
  })

  test("enforce unique email", async () => {
    const email = "example@.com"

    await User.create(buildUser({ email }))

    await expect(
      User.create(buildUser({ email }) as any),
    ).rejects.toMatchObject({
      code: 11000,
    })
  })

  test("hashes password", async () => {
    const plain = "Passw0rd!"
    const user = await User.create(buildUser({ password: plain }))

    expect(user.password).not.toBe(plain)
    expect(user.password).not.toBe(plain)
    expect(typeof user.password).toBe("string")
    expect(user.password.length).toBeGreaterThan(10)
  })

  test("removes password ", async () => {
    const user = await User.create(buildUser())
    const json = user.toJSON()

    expect(json.password).toBe(undefined)
    expect(json.name).toBeDefined()
  })

  test("required test for skill name", async () => {
    await expect(
      User.create(
        buildUser({ skills: [{ name: undefined, years: 2 }] }),
      ) as any,
    ).rejects.toMatchObject({
      errors: {
        "skills.0.name": expect.any(Object),
      },
    })
  })

  test("default for skills", async () => {
    const user = await User.create(buildUser({ skills: [{ name: "NodeJS" }] }))

    expect(
      user.skills.map((skill) => {
        return skill.years
      }),
    ).toEqual([0])
  })
})
