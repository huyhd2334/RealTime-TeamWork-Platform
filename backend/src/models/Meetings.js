import mongoose from "mongoose"

const meetingSchema = new mongoose.Schema({
    hoster: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    code: {
        type: String
    },
    startTime: {
        type: Date,
    },
    endTime: {
        type: Date,
    }
})

const Meetings = mongoose.model("Meetings", meetingSchema)
export default Meetings