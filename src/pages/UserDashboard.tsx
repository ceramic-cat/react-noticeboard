import { Row, Col, Button, Container } from 'react-bootstrap';
import { useStateContext } from '../utils/useStateObject';
import type Notice from '../interfaces/Notice';
import { useApi } from '../hooks/useApi';

UserDashboard.route = {
    path: '/dashboard'
}

export default function UserDashboard() {
    const [state] = useStateContext()
    const { data: notices, loading, error, refetch } = useApi<Notice[]>(`/api/notices?where=userId=${state.user.id}`)

    if (loading) return <div>loading posts</div>
    if (error) return <div>Error: {error}</div>

    async function handleDelete(id: number) {
        const response = await fetch(`/api/notices/${id}`, { method: 'DELETE' })

        const deleteResponse = await response.json()
        console.log(deleteResponse)
        refetch()
    }

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>Hey there {state.user?.firstName}!</h1>
                        {notices?.length === 0 && <p>You have made no notices</p>}
                        {notices?.map(notice => (
                            <div key={notice.id} className='pb-3'>
                                <h3>{notice.header}</h3>
                                <p>{notice.textBody}</p>
                                <Button onClick={() => handleDelete(notice.id)} variant='danger'>Delete</Button>
                                <Button variant='info' className='mx-2'>Edit</Button>
                            </div>
                        ))}
                    </Col>
                </Row>
            </Container>
        </>
    )

}