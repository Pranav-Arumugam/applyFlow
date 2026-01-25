import mongoose from "mongoose"
import { hashPassword } from "../utils/hashPassword.js"

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
    },
    years: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
)

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
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
  { timestamps: true }
)
// checking if the password is being modified to prevent rehashing
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()
  this.password = await hashPassword(this.password)
  next()
})
//just to remove the password value from the user object
UserSchema.methods.toJSON = function () {
  let obj = this.toObject()
  delete obj.password
  return obj
}

export default mongoose.model("User", UserSchema)
