import { Skills } from "../types/index.js"
import { ALL_SKILLS } from "./skillsDb.js"

import { JobFitAnalysis } from "../types/index.js"

//cleanup function to remove noises
const normalise = (text: string = ""): string =>
  String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+.#&/ ]/g, " ")

const tokenize = (text: string): string[] => {
  ///splits the sentence into individual words
  return text
    .trim()
    .split(/\s+/) // Split on one or more whitespace characters
    .filter((token) => token.length > 0) // Remove empty strings
}

//extracting the skills from the text using tokenize function
export const extractSkillsByFrequency = (
  jobDescription: string,
  userSkills: Skills[],
): string[] => {
  const cleanedText = normalise(jobDescription)
  // const tokens = tokenize(cleanedText)

  ///retrieving the user skills from skillset of the user
  const userSkillKeywords = userSkills.map((skill) => skill.name.toLowerCase())

  const skillSet = new Set<string>([...ALL_SKILLS, ...userSkillKeywords])

  const frequencyMap = new Map<string, number>() /// to count the frequency of the skills mentioned in the description

  for (const skill of skillSet) {
    const cleanedSkill = normalise(skill)
    let count = 0
    if (cleanedSkill.length <= 2) {
      const regex = new RegExp(`\\b${cleanedSkill}\\b`, "gi")
      count = (cleanedText.match(regex) || []).length
    } else {
      // fix for bug found while testing where "c" was matching "c++" and "node" was matching "node.js"
      // so skills with special chars like C++ , Node.js will be matched using includes.
      if (/[^a-z0-9 ]/.test(cleanedSkill)) {
        if (cleanedText.includes(cleanedSkill)) {
          count = 1
        }
      } else {
        // for normal skills we will do exact match using regex word boundary to avoid partial matches
        const regex = new RegExp(`\\b${cleanedSkill}\\b`, "gi")
        count = (cleanedText.match(regex) || []).length
      }
    }

    if (count > 0) {
      frequencyMap.set(skill, count)
    }
  }

  const skillsFound = Array.from(frequencyMap.entries())
    .filter(([skill, count]) => count >= 1)
    .sort((a, b) => b[1] - a[1])
    .map(([skill]) => skill)
  return skillsFound
}

export const analyseJobFit = (
  requiredSkills: string[],
  userSkills: Skills[],
): JobFitAnalysis => {
  const userSkillsName = (userSkills || [])
    .map((s) => s.name.toLowerCase())
    .filter(Boolean) //filters out an falsy value

  const matchedSkills = requiredSkills.filter((skill) =>
    userSkillsName.includes(skill.toLowerCase()),
  )

  const missingSkills = requiredSkills.filter(
    (skill) => !userSkillsName.includes(skill.toLowerCase()),
  )

  const matchScore = requiredSkills.length
    ? Math.round((matchedSkills.length / requiredSkills.length) * 100)
    : 0

  return {
    matchedSkills,
    missingSkills,
    matchScore,
    totalRequired: requiredSkills.length,
    totalMatched: matchedSkills.length,
  }
}
