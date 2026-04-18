import { getTaskService } from "@/service/taskService"
import { useState } from "react"
import { toast } from "sonner"

export const useTask = () => {
    const[loadingT, setLoadingT] = useState(false)
    
    const fetchTaskByProject = async(project_id) => {
      try {
        setLoadingT(true)
        const data = await getTaskService(project_id)
        console.log(data)
        if(data.success){
          toast.success("Got Task")
          return data
        }else{
          toast.error("Get task Error")
          return data.success   
        }
      } catch (error) {
        toast.error("error when get task")
        console.error(error)
      } finally {
        setLoadingT(false)
      }
    }

    return {fetchTaskByProject, loadingT}
}
