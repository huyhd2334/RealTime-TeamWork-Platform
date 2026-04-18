import { Button } from '@/components/ui/button'
import { MessageSquareText } from 'lucide-react'

const CommentList = ({ comments }) => {
  if (!comments.length) return null

  return (
    <div className="ml-6 mt-2 text-sm">
      <div className='flex space-x-2 items-center'>
        <b>Comments:</b>
        <Button className="size-[15px]">+</Button>
      </div>

      {comments.map(c => (
        <div key={c.comment_id} className='flex space-x-2'>
          <MessageSquareText size={16} />
          <span>{c.content}</span>
        </div>
      ))}
    </div>
  )
}

export default CommentList