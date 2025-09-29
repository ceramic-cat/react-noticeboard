import { Row, Col, Form, Button, Container, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'
RegisterUser.route = {
    path: '/register-user',
    menuLabel: 'Register',
    hideWhenAuthed: true,
    index: 3,
}

export default function RegisterUser() {
    const [registerPayload, setRegisterPayload] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    })

    const { user, isLoggedIn } = useAuth()

    function setProperty(event: React.ChangeEvent) {
        let { name, value }: { name: string, value: string } = event.target as HTMLInputElement
        setRegisterPayload({ ...registerPayload, [name]: value })
    }

    const navigate = useNavigate()

    async function sendForm(event: React.FormEvent) {
        event.preventDefault()

        const payload: any = { ...registerPayload }

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data = await response.json()

            if ('error' in data) {
                console.log('error')
                console.log(data.error)
            }
            else {
                console.log('success')
                navigate('/login')
            }
        }
        catch (error) {
            console.log('Something went wrong with that request: ', error)
        }
    }

    return <>

        <Container fluid className='d-flex justify-content-center'>        <Col sm={6} md={8}>
            <Row>
                {isLoggedIn ?
                    <Alert variant='warning'>You have to be logged out to register a new user</Alert> :
                    <>
                        <h2 className='mb-4'>Register a New User</h2>
                        <Form onSubmit={sendForm}>
                            <Row>
                                <Form.Group as={Col} >
                                    <Form.Label className="d-block">
                                        <p className='mb-1'>First Name</p>
                                        <Form.Control
                                            name='firstName'
                                            type='text'
                                            required
                                            onChange={setProperty}
                                            placeholder='First name'
                                            autoComplete='off'>
                                        </Form.Control>
                                    </Form.Label>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label className="d-block">
                                        <p className='mb-1'>Last Name</p>
                                        <Form.Control
                                            name='lastName'
                                            type='text'
                                            required
                                            onChange={setProperty}
                                            placeholder='Last name'
                                            autoComplete='off'>
                                        </Form.Control>
                                    </Form.Label>
                                </Form.Group>

                            </Row>
                            <Form.Group className='mt-4'>
                                <Form.Label className="d-block">
                                    <p className='mb-1'>Email adress</p>
                                    <Form.Control
                                        name='email'
                                        type='email'
                                        required
                                        onChange={setProperty}
                                        placeholder='Enter email'
                                        autoComplete='off'>
                                    </Form.Control>
                                </Form.Label>
                            </Form.Group>

                            <Form.Group className='mt-4'>
                                <Form.Label className="d-block">
                                    <p className='mb-1'>Password</p>
                                    <Form.Control
                                        name='password'
                                        type='password'
                                        required
                                        onChange={setProperty}
                                        placeholder='Password'
                                        autoComplete='off'>
                                    </Form.Control>
                                </Form.Label>
                            </Form.Group>
                            <Button
                                variant='primary'
                                type='submit'
                                className='mt-4 float-end'>
                                Register
                            </Button>
                        </Form>
                    </>
                }

            </Row>
        </Col>
        </Container>
    </>
}
