import { analyseJobFit } from "../analyzeJD.js"
import { extractSkillsByFrequency } from "../analyzeJD.js"
import { Skills } from "../../types/index.js"
describe("anaylse Job fit logic", () => {
  test("should return 0 if no match", () => {
    const jobDescription =
      "We are looking for a software engineer with experience in JavaScript and React."
    const userSkills: Skills[] = [
      { name: "Python", years: 0 },
      { name: "Django", years: 1 },
    ]
    const requiredSkills = extractSkillsByFrequency(jobDescription, userSkills)
    // console.log("requiredSkills", requiredSkills)
    const { matchScore } = analyseJobFit(requiredSkills, userSkills)

    expect(matchScore).toBe(0)
  })

  test("should return 100 if all match", () => {
    const jobDescription =
      "We are looking for a software engineer with experience in JavaScript and React."
    const userSkills: Skills[] = [
      { name: "JavaScript", years: 2 },
      { name: "React", years: 3 },
    ]

    const requiredSkills = extractSkillsByFrequency(jobDescription, userSkills)
    // console.log("requiredSkills", requiredSkills)
    const {
      matchedSkills,
      missingSkills,
      matchScore,
      totalRequired,
      totalMatched,
    } = analyseJobFit(requiredSkills, userSkills)
    // console.log("matchedSkills", matchedSkills)
    // console.log("missingSkills", missingSkills)
    // console.log("totalRequired", totalRequired)
    // console.log("totalMatched", totalMatched)
    // console.log("matchScore", matchScore)
    expect(matchScore).toBe(100)
  })

  test("check for no job description value", () => {
    const jobDescription = ""
    const userSkills: Skills[] = [
      { name: "JavaScript", years: 2 },
      { name: "React", years: 3 },
    ]

    const requiredSkills = extractSkillsByFrequency(jobDescription, userSkills)
    console.log("requiredSkills", requiredSkills)
    const {
      matchedSkills,
      missingSkills,
      matchScore,
      totalRequired,
      totalMatched,
    } = analyseJobFit(requiredSkills, userSkills)
    // console.log("matchedSkills", matchedSkills)
    // console.log("missingSkills", missingSkills)
    // console.log("totalRequired", totalRequired)
    // console.log("totalMatched", totalMatched)
    // console.log("matchScore", matchScore)
    expect(matchScore).toBe(0)
  })
})
