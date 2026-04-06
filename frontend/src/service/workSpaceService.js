import api from '@/lib/axios'

export const getWorkSpaceByUserId = async() => {
    const result = await api.get("workspace/get", { withCredentials: true })
    return result.data  
}

export const createUserWorkSpaceService = async({workspace_name, description}) => {
    const result = await api.post("workspace/create", {workspace_name, description}, { withCredentials: true })
    return result.data
}