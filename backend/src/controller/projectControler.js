import { createProjectService, deleteProjectService, findByProjectIdService, findByProjectNameService } from "../service/projectService.js"

export const createProjectControler = async(req, res) => {
    try {
        const result = await createProjectService(req)
        console.log("Created success", result.project)
        res.status(201).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteProjectControler = async(req, res) => {
    try {
        const result = await deleteProjectService(req)
        console.log("Deleted success", result.project)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const findByProjectIdControler = async(req, res) => {
    try {
        const result = await findByProjectIdService(req)
        console.log("Found success", result.project)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const findByProjectNameControler = async(req, res) => {
    try {
        const result = await findByProjectNameService(req)
        console.log("Found success", result.project)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}