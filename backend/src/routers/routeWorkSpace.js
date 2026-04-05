import express from "express"
import { addWorkSpaceMemberControler, createWorkSpaceControler, getUserWorkSpaceControler } from "../controller/workspaceControler.js"

const wordSpace = express.Router()

wordSpace.post("/create", createWorkSpaceControler)
wordSpace.post("/addmember", addWorkSpaceMemberControler)
wordSpace.get("/getworkspace", getUserWorkSpaceControler)

export default wordSpace