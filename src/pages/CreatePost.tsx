import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

CreatePost.route = {
    path: '/create-post',
    menuLabel: 'Create Post',
    index: 2
}

export default function CreatePost() {

    const [notice, setNotice] = useState({
        userId: null,
        header: '',
        textBody: ''
    })


    function setProperty(event: React.ChangeEvent) {
        let { name, value }: { name: string, value: string | number | null } = event.target as HTMLInputElement

        if (name === 'userId') {
            value = isNaN(+value) ? null : +value;
        }
        setNotice({ ...notice, [name]: value })
    }

    const sendForm = (e: any) => {
        // prevent that the page refreshes (default behaviour)
        e.preventDefault()
        const request = { ...notice }
        // if (request.userId === null)
        //      { delete request.userId }
        fetch('/api/notices', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(request)
        }).then(() => {
            console.log('post request finished')
        })
    }
    return <Row>
        <Col>
            <h2>Create a post</h2>
            <form onSubmit={sendForm}>
                <Form.Group>
                    <Form.Label>
                        userId&nbsp;
                        <Form.Control
                            type="number"
                            name='userId'
                            required
                            placeholder='5'
                            onChange={setProperty} />
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Header
                        <Form.Control
                            type="text"
                            name='header'
                            required
                            placeholder='Header'
                            onChange={setProperty} />
                    </Form.Label>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description
                        <Form.Control as="textarea"
                            name='textBody'
                            required
                            placeholder='Text body'
                            onChange={setProperty} />
                    </Form.Label>
                </Form.Group>
                <Button type='submit' className='mt-4 float-end'>Create Post</Button>
            </form>
        </Col>
    </Row>
}