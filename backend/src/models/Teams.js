import mongoose from "mongoose"

const teamsSchema = new mongoose.Schema({
    teamName:{type: String, default: "undefine Name"},
    description: String,
    createBy: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Account",
       required: true
    },
    members: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: "Account"},
        role: {type: String, default: "member"}
    }],
    createAt: {type: Date, default: Date.now}
    }
)

const Teams = mongoose.model("Teams", teamsSchema)
export default Teams