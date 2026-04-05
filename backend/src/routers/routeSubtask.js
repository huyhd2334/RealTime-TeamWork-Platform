import express from "express"
import { createSubTaskControler, deleteSubTaskControler } from "../controller/subtaskControler.js"

const subTaskRouter = express.Router()

subTaskRouter.post("/create", createSubTaskControler)
subTaskRouter.delete("/delete/:id", deleteSubTaskControler)

export default subTaskRouter