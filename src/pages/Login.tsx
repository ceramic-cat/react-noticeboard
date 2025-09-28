import { Row, Col, Form, Button, Container, Alert } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type userInfo from '../interfaces/UserInfo';
import { useStateContext } from '../utils/useStateObject';

Login.route = {
    path: '/login',

}

// remember to check if someone is already logged in with loader (but later)
export default function Login() {

    const [state, setter] = useStateContext()

    const [loginPayload, setLoginPayload] = useState({
        email: '',
        password: ''
    })

    function setProperty(event: React.ChangeEvent) {
        let { name, value }: { name: string, value: string } = event.target as HTMLInputElement
        setLoginPayload({ ...loginPayload, [name]: value })
    }

    interface LoginErrorResponse {
        error: string
    }
    type LoginResponse = userInfo | LoginErrorResponse
    const [errorMessage, setErrorMessage] = useState('')
    
    const navigate = useNavigate()

    async function sendForm(event: React.FormEvent) {
        event.preventDefault()

        const payload: any = { ...loginPayload }
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data: LoginResponse = await response.json()

            if ('error' in data) {
                console.log('error')
                setErrorMessage(data.error)
            } else {
                console.log('success')
                setter('user', data)
                setter('isLoggedIn', true)
                console.log('hello ' + state.user?.firstName)
                setErrorMessage('')
                navigate('/')
            }
        }
        catch (error) {
            console.log('Something went wrong with that request.')
            setErrorMessage('Something went wrong with that request, try later.')
        }
    }
    return <>
        <Container fluid className='d-flex justify-content-center'>
            <Col sm={6} md={8}>
                <Row>
                    {state.isLoggedIn ? 
                    <Alert variant="warning">
                        You can't log in if you are already logged in.
                    </Alert>:
                    <>
                    {errorMessage && (
                    <Alert variant="warning">
                        {errorMessage}
                    </Alert>
                )}
                    <h2 className='mb-4'>Log in</h2>
                    <Form onSubmit={sendForm}>
                        <Form.Group>
                            <Form.Label className='d-block'>
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
                            <Form.Label className='d-block'>
                                <p className='mb-1'>Password</p>
                                <Form.Control
                                    name='password'
                                    type='password'
                                    required
                                    onChange={setProperty}
                                    placeholder='Enter password'
                                    autoComplete='off'>
                                </Form.Control>
                            </Form.Label>
                        </Form.Group>
                        <Button
                            variant='primary'
                            type='submit'
                            className='mt-4 float-end'>
                            Log in
                        </Button>
                    </Form>
                    </>
                }
                </Row>
            </Col>
        </Container>
    </>

}
