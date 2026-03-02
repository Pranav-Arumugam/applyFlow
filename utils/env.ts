const getEnv = (key: string): string => {
  const value = process.env[key]
  if (!value) throw new Error(`Missing environment variable :${key} `)
  return value
}

export const ENV = {
  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN"),
  MONGO_URL: getEnv("MONGO_URL"),
}
