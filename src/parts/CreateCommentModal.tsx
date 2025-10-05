import { Modal, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'

interface CreateCommentProps {
  show: boolean;
  onHide: () => void;
  onSuccess: () => void;
  noticeId: number
}

export default function CreateCommentModal({ noticeId, show, onHide, onSuccess }: CreateCommentProps) {
  const [comment, setComment] = useState({
    text: ''
  })

  const { user } = useAuth()

  function setProperty(event: React.ChangeEvent<HTMLTextAreaElement>) {
    let { name, value } = event.target
    setComment({ ...comment, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const request = {
      ...comment,
      noticeId: noticeId,
      userId: user?.id,
      author: `${user?.firstName} ${user?.lastName}`
    }

    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(request)
    }).then(reponse => {
      if (reponse.ok) {
        onSuccess()
        onHide()
      }
    }).catch(error => {
      console.error('Error creating new comment: ', error)
    })
  }


  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Create Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id='create-comment-form'>
          <Form.Group>
            <Form.Label>Comment:</Form.Label>
            <Form.Control
              name='text'
              type='text-area'
              required
              placeholder='Your comment here'
              value={comment.text}
              onChange={setProperty}
              autoComplete='off'>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>Cancel</Button>
        <Button variant='primary' type='submit' form='create-comment-form'>Create Comment</Button>
      </Modal.Footer>
    </Modal>
  )
}