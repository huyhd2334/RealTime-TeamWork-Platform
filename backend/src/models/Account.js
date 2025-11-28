import mongoose from "mongoose"

const accountSchema = new mongoose.Schema(
{
  userName: {
    type: String,
    required: true
  },
  accountName: {
    type: String,
    required: true
  },
  hashPassW: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
})

const Account = mongoose.model("Account", accountSchema)
export default Account

