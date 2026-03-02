import mongoose, { Schema, Document } from "mongoose"
import { hashPassword } from "../utils/hashPassword.js"
import { USER_ROLES, UserRole } from "../utils/constants.js"

export type Skills = {
  name: string
  years: number
}

export interface Userstruct {
  name: string
  email: string
  password: string
  lastName: string
  location: string
  role: UserRole
  skills: Skills[]
}

export interface UserDocument extends Userstruct, Document {
  createdAt: Date
  updatedAt: Date
}

const skillSchema = new Schema<Skills>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    years: {
      type: Number,
      default: 0,
    },
  },
  { _id: false },
)

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastName: {
      type: String,
      default: "LastName",
    },
    location: {
      type: String,
      default: "my Location",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    skills: {
      type: [skillSchema],
      default: [],
    },
  },
  { timestamps: true },
)
// checking if the password is being modified to prevent rehashing
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await hashPassword(this.password)
  next()
})
//just to remove the password value from the user object
UserSchema.methods.toJSON = function () {
  const obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model<UserDocument>("User", UserSchema)
