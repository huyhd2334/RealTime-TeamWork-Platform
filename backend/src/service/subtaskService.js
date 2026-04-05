import pool from "../../config/db.js";
import { checkMember } from "../models/workSpaceModel.js";
import { roleCheck } from "../models/projectModel.js";
import { createSubTask, deleteSubTask, findBySubTaskId } from "../models/subtaskModel.js";
import { findByTaskId } from "../models/taskModel.js";

export const createSubTaskService = async (data) => {
    const client = await pool.connect()
    try {
        const {workspace_id, task_id, title, status} = data.body
        const created_by = data.user.user_id

        await client.query("BEGIN")
        const check = await checkMember(client,{workspace_id, created_by})
        
        if (check.length === 0) {
           throw new Error("You are not in this workspace")}
        
        const subTask = await createSubTask(client, {task_id, title, status, created_by})
        await client.query("COMMIT")

        console.log({success: true, message: "created subtask", subTask: subTask})
        return {success: true, message: "created subtask", subTask: subTask}
    } catch (err) {
        await client.query("ROLLBACK")
        throw err
    } finally {
        client.release()
    }
}

export const deleteSubTaskService = async(data) => {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")
        const subtask_id = data.params.id
        const user_id = data.user.user_id

        const subtask = await findBySubTaskId(client, subtask_id)
        const task = await findByTaskId(client, subtask.task_id)

        const project_id = task.project_id

        const getRole = await roleCheck(client, {project_id, created_by:user_id})
        const role = getRole[0].role

        if(!["admin", "manager"].includes(role) && task.created_by != user_id){
                throw new Error("No permission")
        }
        const deleSubTask = await deleteSubTask(client, subtask_id)
        console.log("deleTask", deleSubTask)
        await client.query("COMMIT")
        return {success: true, message: "Deleted subtask", subtask: deleSubTask}
    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    }finally{
        client.release()
    }
}
