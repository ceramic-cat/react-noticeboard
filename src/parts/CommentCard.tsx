import { Card } from "react-bootstrap";
import type Comment from "../interfaces/Comment"
interface CommentProps {
  comment: Comment
}

export default function CommentCard({ comment }: CommentProps) {
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
    </Card>
  )
}