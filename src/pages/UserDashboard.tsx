import { Row, Col, Button, Container, Badge } from 'react-bootstrap';
import type Notice from '../interfaces/Notice';
import { useApi } from '../hooks/useApi';
import { useState } from 'react';
import EditNoticeModal from '../parts/EditNoticeModal';
import { useAuth } from '../contexts/AuthContext'


UserDashboard.route = {
    path: '/dashboard',
    menuLabel: 'Dashboard',
    index: 2,
    requiresAuth: true
}

export default function UserDashboard() {
    const { user } = useAuth()

    const { data: notices, loading, error, refetch } = useApi<Notice[]>(`/api/notices?where=userId=${user?.id}`)
    const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    if (loading) return <div>loading posts</div>
    if (error) return <div>Error: {error}</div>

    const handleEditClick = (notice: Notice) => {
        setSelectedNotice(notice);
        setShowEditModal(true);
    };

    const handleDelete = (noticeId: number) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            fetch(`/api/notices/${noticeId}`, {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' }
            }).then(() => {
                refetch(); // Refresh the list after deletion
            });
        }
    };


    return (
        <Container>
            <Row>
                <Col>

                    <h1>Hey there {user?.firstName}!</h1>
                    {notices?.length === 0 && <p>You have made no notices</p>}
                    {notices?.map(notice => (
                        <div
                            key={notice.id}
                            className='pb-3'>
                            <hr />
                            <h3>{notice.header}</h3>
                            <p>{notice.textBody}</p>
                            <p className='my-1'>
                                {String(notice.categories).split(' ').map((category, index) => (
                                    <Badge bg="secondary" className="me-1" key={index}>
                                        {category}
                                    </Badge>
                                ))}
                            </p>

                            <Button
                                variant='warning'
                                onClick={() => handleEditClick(notice)}>
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDelete(notice.id)}
                                className="mx-2"
                            >
                                Delete
                            </Button>
                        </div>
                    ))}
                    <hr />

                    <EditNoticeModal
                        show={showEditModal}
                        notice={selectedNotice}
                        onHide={() => setShowEditModal(false)}
                        onSuccess={refetch}
                    />
                </Col>
            </Row>
        </Container>
    )

}