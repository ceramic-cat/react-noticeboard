import { useApi } from "../hooks/useApi";
import type Comment from "../interfaces/Comment"
import CommentCard from "./CommentCard";
interface CommentsProps {
  noticeId: number
}

export default function Comments({ noticeId }: CommentsProps) {
  const { data: comments, loading, error } = useApi<Comment[]>(`/api/comments?where=noticeId=${noticeId}`)

  if (loading) return <div>loading comments</div>
  if (error) return <div>Error: {error}</div>

  if (comments?.length === 0) return <span>0 comments</span>
  if (comments?.length === 1) console.log('kommmentarer: ', comments)

  return (<>
    {comments?.map((comment) => {
      return (
        <CommentCard comment={comment} />
      )
    })}
  </>)
}