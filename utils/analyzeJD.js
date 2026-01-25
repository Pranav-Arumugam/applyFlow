import { ALL_SKILLS } from "./skillsDb.js"
//cleanup function to remove noises
const normalise = (text = "") =>
  String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+.#&/ ]/g, " ")

const tokenize = (text) => {
  ///splits the sentence into individual words
  return text
    .trim()
    .split(/\s+/) // Split on one or more whitespace characters
    .filter((token) => token.length > 0) // Remove empty strings
}

//extracting the skills from the text using tokenize function
export const extractSkillsByFrequency = (jobDescription, userSkills) => {
  const cleanedText = normalise(jobDescription)
  const tokens = tokenize(cleanedText)

  ///retrieving the user skills from skillset of the user
  const userSkillKeywords = userSkills.map((skill) => skill.name.toLowerCase())

  const skillSet = new Set([...ALL_SKILLS, ...userSkillKeywords])

  const frequencyMap = new Map() /// to count the frequency of the skills mentioned in the description

  for (const token of tokens) {
    if (skillSet.has(token)) {
      frequencyMap.set(token, (frequencyMap.get(token) || 0) + 1)
    }
  }

  const skillsFound = Array.from(frequencyMap.entries())
    .filter(([skill, count]) => count >= 1)
    .sort((a, b) => b[1] - a[1])
    .map(([skill, count]) => skill)
  return skillsFound
}

export const analyseJobFit = (requiredSkills, userSkills) => {
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
