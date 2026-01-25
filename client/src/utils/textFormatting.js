export const formatTextIntoParagraphs = (text) => {
  if (!text || typeof text !== "string") return []

  // multiple line breaks
  const paragraphs = text
    .split(/\n\n+|\r\n\r\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0)

  // checking for single line breaks if no double line breaks
  if (paragraphs.length === 1) {
    return text
      .split(/\n|\r\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 0)
  }

  return paragraphs
}

export const isHeading = (text) => {
  if (!text || text.length > 100) return false //ignoring sentence with more than 100 chars which is not likely a heading

  const headingPatterns = [
    /^(About|Requirements|Responsibilities|Qualifications|Benefits|Skills|Role|Position|Description|Overview|Duties|Experience|Education|Summary|What [Yy]ou'll [Dd]o|Who [Yy]ou [Aa]re)/i,
    /^[A-Z\s]{3,}:?$/, //any text ends with colon and starts with capital letters for first 3 characters
    /:$/, //text ends with colon
  ]

  return headingPatterns.some((pattern) => pattern.test(text.trim()))
}

export const hasBulletPoints = (text) => {
  return /^[\s]*[-•*]\s/.test(text)
}

export const extractBulletItems = (text) => {
  return text
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => line.replace(/^[-•*]\s*/, ""))
}

export const calculateReadingTime = (text, wordsPerMinute = 200) => {
  if (!text) return 0
  const wordCount = text.split(/\s+/).length
  return Math.ceil(wordCount / wordsPerMinute)
}

export const getWordCount = (text) => {
  if (!text) return 0
  return text.split(/\s+/).filter((word) => word.length > 0).length
}

export const formatDate = (dateString) => {
  if (!dateString) return ""

  const date = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (date.toDateString() === today.toDateString()) return "Today"
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow"

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
  })
}

export const getRelativeTime = (dateString) => {
  if (!dateString) return ""

  const date = new Date(dateString)
  const now = new Date()
  const diffInMs = now - date
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return "Today"
  if (diffInDays === 1) return "Yesterday"
  if (diffInDays < 7) return `${diffInDays} days ago`
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}
