import express from "express"
import {checkRoom, createRoomCode} from "../controller/LogicRoom.js"
const roomRouter = express.Router()

roomRouter.get("/createroom", createRoomCode)
roomRouter.post("/checkroom", checkRoom)

export default roomRouter