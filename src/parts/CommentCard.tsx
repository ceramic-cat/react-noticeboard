import { Badge, Button, Card } from "react-bootstrap";
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

    }
  }
  return (
    <Card bg="light" className="mt-2">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <Badge pill bg="info">
          {comment.author}
        </Badge>
        <Badge bg="info">{comment.created}</Badge>
      </Card.Header>
      <Card.Body key={comment.id} >
        <Card.Text>
          {comment.text}
        </Card.Text>
        <Card.Text >

        </Card.Text>
      </Card.Body >
      {user?.id === comment.userId &&
        <Card.Footer>
          <Button variant="secondary" size="sm" onClick={() => handleDelete(comment.id)}><Trash /></Button>
        </Card.Footer>}
    </Card >
  )
}