import Meetings from "../models/Meetings.js";
import crypto from "crypto"

export const createRoomCode = async(req, res) => {
    try{
    const user = req.user; 
    const code = crypto.randomBytes(3).toString("hex")
    const rooms = await Meetings.updateMany(
                                            {hoster: user._id, endTime: { $exists: false }}, 
                                            {$set: {endTime: new Date() }})
    const newRoom = await Meetings.create({
                                            hoster: user._id,
                                            code: code,
                                            startTime: new Date(),
                                            });
    if (newRoom) {
       console.log("created meeting", newRoom.code)
       return res.status(200).json({message: true, code: code})

    }
    }catch(e){
        console.log("error when call create room code", e)
        return res.status(500).json({message: false, detail: "error when create room code"})
    }
}

export const checkRoom = async(req, res) => {
    try {
        const {roomCode} = req.body
        console.log("get room: ", roomCode)
        if (roomCode) {
           const room = await Meetings.findOne({code: roomCode, endTime: { $exists: false }}).populate('hoster', 'userName')
           if (room) {
            return res.status(202).json({message: true, detail: `joined ${room.hoster.userName} room`})
           }else{return res.status(202).json({message: false, detail: "room not found or ended"})}
        }
    } catch (error) {
        console.log("error call checkroom ", error)
        return res.status(500).json({ message: false, detail: "Server error" })
    }
}