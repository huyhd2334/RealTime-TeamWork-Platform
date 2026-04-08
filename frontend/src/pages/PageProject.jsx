import MainNavigator from '@/components/cpMainNavigator/MainNavigator.jsx'
import MainProject from '@/components/cpProjectPage/projectUI/MainProject.jsx'
import { useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom"

const PageProject = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const workspaceId = Number(id)

  useEffect(() => {
    if (!workspaceId) {
      navigate("/homepage")
    }
  }, [workspaceId, navigate])

  return (
    <div>
      <MainNavigator/>
      <MainProject id={workspaceId}/>
    </div>
  )
}

export default PageProject