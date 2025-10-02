import { Button, Card } from "react-bootstrap";
import type Comment from "../interfaces/Comment"
import { useAuth } from "../contexts/AuthContext";
import { Trash } from 'react-bootstrap-icons'
interface CommentProps {
  comment: Comment,
  deleteSuccess: () => void
}

export default function CommentCard({ comment, deleteSuccess }: CommentProps) {
  const { user } = useAuth()

  const handleDelete = (commentId: number) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' }
      }).then(response => {
        if (response.ok) {
          deleteSuccess()
        }
      }).catch(error => {
        console.error('Error deleting comment:', error)
      })

      // then(() => { deleteSuccess() })
    }
  }
  return (
    <Card>
      <Card.Body key={comment.id}>
        <Card.Text>
          {comment.text}
        </Card.Text>
        <Card.Text >
          {comment.author} on {comment.created}
        </Card.Text>
      </Card.Body >
      {user?.id === comment.userId &&
        <Card.Footer>
          <Button variant="danger" size="sm" onClick={() => handleDelete(comment.id)}><Trash /> Delete</Button>
        </Card.Footer>}
    </Card >
  )
}