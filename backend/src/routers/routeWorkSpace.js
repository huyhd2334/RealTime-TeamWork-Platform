import express from "express"
import { addWorkSpaceMemberControler, createWorkSpaceControler, deleteWorkSpaceControler, getUserWorkSpaceControler, getWorkSpaceProjectControler } from "../controller/workspaceControler.js"

const workSpace = express.Router()

workSpace.post("/create", createWorkSpaceControler)
workSpace.post("/addmember", addWorkSpaceMemberControler)
workSpace.get("/get", getUserWorkSpaceControler)
workSpace.get("/get/projects/:id", getWorkSpaceProjectControler)
workSpace.delete("/delete/:id", deleteWorkSpaceControler)

export default workSpace