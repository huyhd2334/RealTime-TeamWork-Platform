import {createUserWorkSpaceService, getWorkSpaceByUserId } from "@/service/workSpaceService"
import { useState } from "react"
import { toast } from "sonner"

export const useWorkSpace = () => {
    const[loading, setLoading] = useState(false)
    const getUserWorkSpace = async() =>{
      try {
        setLoading(true)
        const data = await getWorkSpaceByUserId()

        if(data.success){
          console.log("Got workspaces", data.workspaces)
          toast.success("Got workspaces")
          return data.workspaces
        }else{
          toast.error("get workspaces error")
          return []
        }
      } catch (error) {
        toast.error("error when get user workspaces")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    
    const createUserWorkSpace = async({workspace_name, description}) => {
      try {
        setLoading(true)
        const data = await createUserWorkSpaceService({workspace_name, description})
        console.log(data)
        if(data.success){
          toast.success("Created WorkSpace")
          return data.success
        }else{
          toast.error("Created WorkSpace Error")
          return data.success   
        }
      } catch (error) {
        toast.error("error when create workSpace")
        console.error(error)
      }
    }
    return {getUserWorkSpace, createUserWorkSpace, loading}
}
