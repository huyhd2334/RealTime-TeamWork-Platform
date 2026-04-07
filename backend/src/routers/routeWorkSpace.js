import express from "express"
import { addWorkSpaceMemberControler, createWorkSpaceControler, deleteWorkSpaceControler, getUserWorkSpaceControler } from "../controller/workspaceControler.js"

const workSpace = express.Router()

workSpace.post("/create", createWorkSpaceControler)
workSpace.post("/addmember", addWorkSpaceMemberControler)
workSpace.get("/get", getUserWorkSpaceControler)
workSpace.delete("/delete/:id", deleteWorkSpaceControler)

export default workSpace