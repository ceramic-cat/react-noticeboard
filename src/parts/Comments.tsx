import { Button, Collapse } from "react-bootstrap";
import { useApi } from "../hooks/useApi";
import type Comment from "../interfaces/Comment"
import CommentCard from "./CommentCard";
import CreateCommentModal from "./CreateCommentModal";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
interface CommentsProps {
  noticeId: number
}

export default function Comments({ noticeId }: CommentsProps) {
  const { data: comments, loading, error, refetch } = useApi<Comment[]>(`/api/comments?where=noticeId=${noticeId}`)
  const { isLoggedIn } = useAuth()
  const [showCreateCommentModal, setShowCreateCommentModal] = useState(false)
  const [showComments, setShowComments] = useState(false)

  if (loading) return <div>loading comments</div>
  if (error) return <div>Error: {error}</div>
  if (comments?.length === 1) console.log('kommmentarer: ', comments)


  return (<>
    {isLoggedIn && <div>
      <Button
        onClick={() => setShowCreateCommentModal(true)}
        variant="outline-primary"
        size="sm"
        className="btn-small">
        Add comment
      </Button>
    </div>

    }


    {comments?.length === 0 ? <div>0 comments</div> :
      <div>
        <Button
          size="sm"
          onClick={() => setShowComments(!showComments)}
          aria-controls="collapsable-comments"
          aria-expanded={showComments}
        >Show comments</Button>
        <Collapse in={showComments}>
          <div id="collapsable-comments">
            {comments?.map((comment) => (
              <CommentCard key={comment.id} comment={comment} deleteSuccess={refetch} />
            ))}
          </div>
        </Collapse>
      </div>
    }

    <CreateCommentModal
      noticeId={noticeId}
      show={showCreateCommentModal}
      onHide={() => setShowCreateCommentModal(false)
      }
      onSuccess={refetch}

    />
  </>)
}