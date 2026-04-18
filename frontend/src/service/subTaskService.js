import api from '@/lib/axios'

export const getSubTaskService = async({workspace_id, project_id}) => {
      const result = await api.get(`subtask/get/${workspace_id}/${project_id}`)
      return result.data
}