import { describe, test, expect, beforeAll, afterAll, afterEach } from "vitest"
import mongoose, { Types } from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"

import Job from "../JobModel.js"
import { JOB_STATUS, JOB_MODE, JOB_TYPES } from "../../utils/constants.js"

let mongo: MongoMemoryServer

beforeAll(async () => {
  mongo = await MongoMemoryServer.create()
  await mongoose.connect(mongo.getUri())
  await Job.syncIndexes()
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

const buildJob = (overrides: Record<string, unknown> = {}) => ({
  company: "Acme",
  position: "Software Engineer",
  jobUrl: "https://example.com/job/1",
  createdBy: new Types.ObjectId(),
  ...overrides,
})

describe("Job Model", () => {
  test("applies defaults", async () => {
    const job = await Job.create(buildJob())

    expect(job.jobStatus).toBe(JOB_STATUS.PENDING)
    expect(job.jobMode).toBe(JOB_MODE.REMOTE)
    expect(job.jobType).toBe(JOB_TYPES.FULLTIME)

    expect(job.requiredSkills).toEqual([])
    expect(job.matchedSkills).toEqual([])
    expect(job.missingSkills).toEqual([])
    expect(job.matchScore).toBe(0)

    expect(job._id).toBeDefined()
    expect(job.createdAt).toBeInstanceOf(Date)
    expect(job.updatedAt).toBeInstanceOf(Date)
  })

  test("enforces unique (createdBy + jobUrl)", async () => {
    const createdBy = new Types.ObjectId()
    const jobUrl = "https://example.com/job/dup"

    await Job.create(buildJob({ createdBy, jobUrl }))

    await expect(
      Job.create(buildJob({ createdBy, jobUrl })),
    ).rejects.toMatchObject({ code: 11000 })
  })

  test("requires createdby", async () => {
    await expect(
      Job.create(buildJob({ createdBy: undefined }) as any),
    ).rejects.toMatchObject({
      errors: {
        createdBy: expect.any(Object),
      },
    })
  })
})
