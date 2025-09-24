import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

CreatePost.route = {
    path: '/create-post',
    menuLabel: 'Create Post',
    index: 2
}

export default function CreatePost() {

    const [notice, setNotice] = useState({
        userId: null,
        header: '',
        textBody: '',
        categories: ''
    })

    const navigate = useNavigate()

    function setProperty(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        let { name, value } = event.target
        let processedValue: string | number | null | string[] = value

        if (name === 'userId') {
            processedValue = isNaN(+value) ? null : +value;
        }

        if (name === 'categories') {
            const cleanCategories = value
                .split(' ') // split by space
                .map(cat => cat.trim().toLocaleLowerCase())
                .filter(cat => cat.length > 0) // remove empty strings
                .map(cat => cat.trim()) // remove whitespace

            processedValue = cleanCategories.join(' ')
        }

        setNotice({ ...notice, [name]: processedValue })
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
            navigate('/')
        })

    }
    return <Row>
        <Col>
            <h2>Create a post</h2>
            <form onSubmit={sendForm}>
                <Form.Group className='mb-4'>
                    <Form.Label>
                        userId
                    </Form.Label>
                    <Form.Control
                        name='userId'
                        type="number"
                        required
                        placeholder='5'
                        onChange={setProperty} />
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>Header
                    </Form.Label>
                    <Form.Control
                        name='header'
                        type="text"
                        required
                        placeholder='Header'
                        onChange={setProperty} />
                </Form.Group>
                <Form.Group className='mb-4'>
                    <Form.Label>Description
                    </Form.Label>
                    <Form.Control
                        name='textBody'
                        as="textarea"
                        rows={5}
                        required
                        placeholder='Description'
                        onChange={setProperty} />
                </Form.Group>
                <Form.Group>
                    <Form.Label> Categories
                    </Form.Label>
                    <Form.Control
                        name='categories'
                        type='text'
                        placeholder=''
                        onChange={setProperty} />

                </Form.Group>
                <Button type='submit' className='mt-4 float-end'>Create Post</Button>
            </form>
        </Col>
    </Row>
}