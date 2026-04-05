import express from "express"
import { createProjectControler, deleteProjectControler, findByProjectIdControler, findByProjectNameControler } from "../controller/projectControler.js"

const projectRouter = express.Router()

projectRouter.get("/find-id/:id", findByProjectIdControler)
projectRouter.post("/create", createProjectControler)
projectRouter.delete("/delete/:id", deleteProjectControler)
projectRouter.get("/find-name/:name", findByProjectNameControler)

export default projectRouter