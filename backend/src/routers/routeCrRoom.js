import express from "express"
import {createRoomCode} from "../controller/LogicRoom.js"
const roomRouter = express.Router()

roomRouter.get("/createroom", createRoomCode)

export default roomRouter