import { Modal, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import type Notice from '../interfaces/Notice';
import { useAuth } from '../contexts/AuthContext'

interface EditNoticeModalProps {
  show: boolean;
  notice: Notice | null;
  onHide: () => void;
  onSuccess: () => void;
}

export default function EditNoticeModal({ show, notice, onHide, onSuccess }: EditNoticeModalProps) {
  const [editedNotice, setEditedNotice] = useState({
    header: '',
    textBody: '',
    categories: ''
  });
  const { user } = useAuth()
  useEffect(() => {
    if (notice) {
      setEditedNotice({
        header: notice.header,
        textBody: notice.textBody,
        categories: notice.categories
      });
    }
  }, [notice]);

  function setProperty(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    let { name, value } = event.target;
    setEditedNotice({ ...editedNotice, [name]: value });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!notice) return;

    let processedCategories = editedNotice.categories;
    if (editedNotice.categories) {
      const cleanCategories = String(editedNotice.categories)
        .split(' ')
        .map(cat => cat.trim().toLowerCase())
        .filter(cat => cat.length > 0);
      processedCategories = cleanCategories.join(' ');
    }

    const updatedNotice: Notice = {
      id: notice.id,
      userId: notice.userId,
      header: editedNotice.header,
      textBody: editedNotice.textBody,
      categories: processedCategories,
      author: `${user?.firstName} ${user?.lastName}`
    };

    fetch(`/api/notices/${notice.id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updatedNotice)
    }).then(response => {
      if (response.ok) {
        onSuccess();
        onHide();
      }
    }).catch(error => {
      console.error('Error updating notice:', error);
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} id="edit-notice-form">
          <Form.Group className='mb-4'>
            <Form.Label>Header</Form.Label>
            <Form.Control
              name='header'
              type="text"
              required
              placeholder='Header'
              value={editedNotice.header}
              onChange={setProperty}
              autoComplete='off'
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Description</Form.Label>
            <Form.Control
              name='textBody'
              as="textarea"
              rows={5}
              required
              placeholder='Description'
              value={editedNotice.textBody}
              onChange={setProperty}
              autoComplete='off'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categories</Form.Label>
            <Form.Control
              name='categories'
              type='text'
              placeholder=''
              value={editedNotice.categories}
              onChange={setProperty}
              autoComplete='off'
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" form="edit-notice-form">
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}