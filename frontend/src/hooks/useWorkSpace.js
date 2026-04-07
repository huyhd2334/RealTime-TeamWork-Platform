import {addMemberService, createUserWorkSpaceService, deleteWorkSpaceService, getWorkSpaceByUserId } from "@/service/workSpaceService"
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

    const deleteWorkSpace = async(workspace_id) => {
      try {
          setLoading(true)
          const data = await deleteWorkSpaceService(workspace_id)
          if(data.success){
            toast.success("Delete Done !")
          }
          else{toast.error("Delete Fail")}
      } catch (error) {
        toast.error("error when delete workSpace")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    const addMemberWorkSpace = async({workspace_id, member_id, role}) => {
      try {
          setLoading(true)
          const data = await addMemberService({workspace_id, member_id, role})
          if(data.success){
            toast.success("Add Done !" + data.message)
          }
          else{toast.error("Add Fail" + data.message)}
      } catch (error) {
        toast.error("error when add member workSpace")
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    return {getUserWorkSpace, createUserWorkSpace, deleteWorkSpace, addMemberWorkSpace, loading}
}
