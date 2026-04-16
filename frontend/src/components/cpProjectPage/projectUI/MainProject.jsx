import React, { useEffect, useState } from 'react'
import styles from './projectUI.module.css'
import { useWorkSpace } from '@/hooks/useWorkSpace.js'
import { useTask } from '@/hooks/useTask.js'

const MainProject = ({ id }) => {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])

  const { getWorkSpaceProject } = useWorkSpace()
  const { fetchTaskByProject } = useTask()

  const fetchProjects = async () => {
    if (!id) return

    const res = await getWorkSpaceProject(id)
    setProjects(res || [])
  }

  useEffect(() => {
    fetchProjects()
  }, [id])

  const handleGetTasks = async (project_id) => {
    const exists = tasks.some(item => item.project_id === project_id)
    if (exists) return

    const res = await fetchTaskByProject(project_id)

    if (res?.project_task) {
      setTasks(prev => [
        ...prev,
        {
          project_id,
          tasks: res.project_task
        }
      ])
    }
  }

  return (
    <div className="flex flex-col p-12 space-y-5">
      <h1 className={styles.title}>WorkSpace ID: {id}</h1>

      <div>
        {projects.length === 0 ? (
          <h1 className={styles.subTitle}>
            Project is empty, Create new one.
          </h1>
        ) : (
          projects.map((pj) => {
            const projectTask = tasks.find(
              item => item.project_id === pj.project_id
            )

            return (
              <div key={pj.project_id}>
                <div
                  className={styles.headerProject}
                  onClick={() => handleGetTasks(pj.project_id)}
                >
                  <span>Project Name: {pj.project_name} - </span>
                  <span>ID: {pj.project_id} - </span>
                  <span>Status: {pj.status}</span>
                </div>

                {projectTask?.tasks?.length > 0 && (
                  <div className="ml-8 mt-2 space-y-2">
                    {projectTask.tasks.map((t) => (
                      <div
                        key={t.task_id}
                        className={styles.headerProject}
                      >
                        <span>Task Name: {t.title} - </span>
                        <span>ID: {t.task_id} - </span>
                        <span>Description: {t.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default MainProject