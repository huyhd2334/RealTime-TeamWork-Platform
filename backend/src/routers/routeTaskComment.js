import express from "express"
import { createTaskCommentControler, deleteTaskCommentControler } from "../controller/taskCommentControler.js"

const taskCommentRouter = express.Router()

taskCommentRouter.post("/create", createTaskCommentControler)
taskCommentRouter.delete("/delete/:id", deleteTaskCommentControler)

export default taskCommentRouter