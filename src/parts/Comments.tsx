import { Button } from "react-bootstrap";
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


  if (loading) return <div>loading comments</div>
  if (error) return <div>Error: {error}</div>
  if (comments?.length === 1) console.log('kommmentarer: ', comments)


  function handleClick() {
    setShowCreateCommentModal(true)

  }

  return (<>
    {isLoggedIn && <div>
      <Button
        onClick={handleClick}
        variant="outline-primary"
        size="sm"
        className="btn-small">
        Add comment
      </Button>
    </div>

    }


    {comments?.length === 0 ? <div>0 comments</div> :
      comments?.map((comment) => {
        return (
          <CommentCard comment={comment} />
        )
      })
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