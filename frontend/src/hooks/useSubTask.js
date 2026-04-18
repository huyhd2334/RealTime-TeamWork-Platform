// 

import { getSubTaskService } from "@/service/subtaskService.js"
import { useState } from "react"
import { toast } from "sonner"

export const useSubTask = () => {
    const[loadingSb, setLoadingSb] = useState(false)
    
    const fetchSubTask = async({workspace_id, project_id}) => {
      try {
        setLoadingSb(true)
        const data = await getSubTaskService({workspace_id, project_id})
        console.log(data)
        if(data.success){
          toast.success("Got SubTask")
          return data
        }else{
          toast.error("Get SubTask Error")
          return data.success   
        }
      } catch (error) {
        toast.error("error when get subTask")
        console.error(error)
      } finally {
        setLoadingSb(false)
      }
    }

    return {fetchSubTask, loadingSb}
}
