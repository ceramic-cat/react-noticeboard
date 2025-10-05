import { Button, Collapse, Stack } from "react-bootstrap";
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

    <Stack direction="horizontal" gap={1} className="d-flex justify-content-between align-items-center">

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
      <Button
        size="sm"
        variant="primary"
        onClick={() => setShowComments(!showComments)}
        aria-controls="collapsable-comments"
        aria-expanded={showComments}
        disabled={comments?.length === 0}
      >{showComments ? `Hide comments` : `Comments (${comments?.length})`}</Button>
    </Stack>
    {comments &&
      <Collapse in={showComments}>
        <Stack
          id="collapsable-comments"
          gap={2}>
          {comments?.map((comment) => (
            <CommentCard key={comment.id} comment={comment} deleteSuccess={refetch} />
          ))}
        </Stack>
      </Collapse>
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