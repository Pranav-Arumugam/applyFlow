import { describe, test, expect, beforeAll, afterAll, afterEach } from "vitest"
import mongoose, { Types } from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

import InterviewModel from "../InterviewModel.ts"
import { INTERVIEW_MODE, INTERVIEW_STATUS } from "../../utils/constants.ts"

let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  await mongoose.connect(mongo.getUri())
  await InterviewModel.syncIndexes()
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

const buildInterview = (overrides: Record<string, unknown> = {}) => ({
  company: "Google",
  position: "Software Engineer",
  interviewAt: new Date(),
  mode: INTERVIEW_MODE.ONLINE,
  status: INTERVIEW_STATUS.UPCOMING,
  location: "London",
  notes: "Revise System Design",
  createdBy: new Types.ObjectId(),
  ...overrides,
})

describe("InterviewModel", () => {
  test("checking defaults", async () => {
    const interview = await InterviewModel.create(
      buildInterview({
        mode: undefined,
        status: undefined,
      }),
    )

    expect(interview.mode).toBe(INTERVIEW_MODE.ONLINE)
    expect(interview.status).toBe(INTERVIEW_STATUS.UPCOMING)
    expect(interview.createdAt).toBeInstanceOf(Date)
    expect(interview.createdBy).toBeInstanceOf(Types.ObjectId)
  })

  test("required createdBy", async () => {
    await expect(
      InterviewModel.create(
        buildInterview({
          company: undefined,
          position: undefined,
          interviewAt: undefined,
          createdBy: undefined,
        }),
      ),
    ).rejects.toThrow()
  })
})
