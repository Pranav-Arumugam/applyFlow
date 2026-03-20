import * as dotenv from "dotenv"
dotenv.config()

const getEnv = (key: string): string => {
  const value = process.env[key]
  if (!value) throw new Error(`Missing environment variable :${key} `)
  return value
}

const getOptionalEnv = (key: string): string | undefined => {
  return process.env[key]
}

export const ENV = {
  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: getEnv("JWT_EXPIRES_IN"),
  MONGO_URL: getEnv("MONGO_URL"),
  CLIENT_URL_1: getOptionalEnv("CLIENT_URL_1"),
  CLIENT_URL_2: getOptionalEnv("CLIENT_URL_2"),
  CLIENT_URL_3: getOptionalEnv("CLIENT_URL_3"),
  CLIENT_URL_4: getOptionalEnv("CLIENT_URL_4"),
}
