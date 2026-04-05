import pool from "../../config/db.js";
import { createWorkSpace, addMemberWorkSpace, findWorkSpaceByUserId } from "../models/workSpaceModel.js";

export const createWorkSpaceService = async (data) => {
    const client = await pool.connect()
    try {
        const workspace_name = data.body.workspace_name
        const owner_id = data.user.owner_id
        await client.query("BEGIN")
        const workspace = await createWorkSpace(client, {workspace_name, owner_id})
        await addMemberWorkSpace(client, {workspace_id: workspace.workspace_id, user_id: owner_id, role: "admin"})
        await client.query("COMMIT")
        console.log({success: true, message: "created workspace", workSpace: workspace})
        return {success: true, message: "created workspace", workSpace: workspace}
    } catch (err) {
        await client.query("ROLLBACK")
        throw err
    } finally {
        client.release()
    }
}

export const addMemberWorkSpaceService = async(data) => {
    const client = await pool.connect()
    try {
        const user_id = data.user_id
        const workspace_id = data.workspace_id
        const role = data.role
        await client.query("BEGIN")
        const newMember = await addMemberWorkSpace(client, {workspace_id: workspace_id, user_id , role})
        await client.query("COMMIT")

        return {success: true, message: "added member", member: newMember}
    } catch (err) {
        await client.query("ROLLBACK")
        throw err
    } finally {
        client.release()
    }
}

export const getUserWorkSpaceService = async(data) => {
    const client = await pool.connect()
    try {
        await client.query("BEGIN")
        const user_id = data.user.user_id
        const workSpaces = await findWorkSpaceByUserId(client, user_id)
        await client.query("COMMIT")
        return {success: true, message: "Got workspaces", workspaces: workSpaces}

    } catch (error) {
        await client.query("ROLLBACK")
        throw error
    }finally{
        client.release()
    }
}