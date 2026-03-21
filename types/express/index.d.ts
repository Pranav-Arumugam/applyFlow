import { UserPayload } from "../index.js"

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}

export {}
