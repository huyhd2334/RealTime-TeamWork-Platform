import styles from './projectUI.module.css'
import SubTaskList from './SubTaskList'
import CommentList from './CommentList'
import AttachmentList from './AttachmentList'

const TaskItem = ({ task }) => {
  return (
    <div className={styles.task}>
      <div className='flex space-x-4'>
        <b>{task.title}</b>
        <b className={task.status === "done" ? styles.statusDone : styles.status}>
          {task.status}
        </b>
      </div>

      <div className="text-sm text-gray-600">
        {task.description}
      </div>

      <SubTaskList subTasks={task.subTasks} />
      <CommentList comments={task.comments} />
      <AttachmentList attachments={task.attachments} />
    </div>
  )
}

export default TaskItem