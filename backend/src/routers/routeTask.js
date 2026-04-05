import express from "express"
import { createTaskControler, deleteTaskControler } from "../controller/taskControler.js"

const taskRouter = express.Router()

taskRouter.post("/create", createTaskControler)
taskRouter.delete("/delete/:id", deleteTaskControler)

export default taskRouter