import { addMemberWorkSpaceService, createWorkSpaceService, getUserWorkSpaceService } from "../service/workSpaceService.js"

export const createWorkSpaceControler = async(req, res) => {
    try {
        const result = await createWorkSpaceService(req)
        console.log("Created success", result.workSpace)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const addWorkSpaceMemberControler = async(req, res) => {
    try {
        const result = await addMemberWorkSpaceService(req.body)
        console.log("added member success", result.member)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getUserWorkSpaceControler = async(req, res) => {
    try {
        const result = await getUserWorkSpaceService(req)
        console.log("workspaces:", result)
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}