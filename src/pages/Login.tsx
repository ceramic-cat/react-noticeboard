import { Row, Col, Form, Button, Container, Alert } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

Login.route = {
    path: '/login',
    menuLabel: 'Log in',
    index: 4
}


// remember to check if someone is already logged in with loader (but later)
export default function Login() {


    const [loginPayload, setLoginPayload] = useState({
        email: '',
        password: ''
    })

    function setProperty(event: React.ChangeEvent) {
        let { name, value }: { name: string, value: string } = event.target as HTMLInputElement
        setLoginPayload({ ...loginPayload, [name]: value })
    }

    interface LoginSuccessResponse {
        id: number,
        created: string,
        email: string,
        firstName: string,
        lastName: string,
        role: string
    }
    interface LoginErrorResponse {
        error: string
    }
    type LoginResponse = LoginSuccessResponse | LoginErrorResponse

    const [errorMessage, setErrorMessage] = useState('')
    const [user, setUser] = useState<LoginSuccessResponse | null>(null)

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
                setUser(data)
                console.log('hello ' + data.firstName)
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
            <Col sm={6}>
                <Row>{errorMessage && !user && (
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
                </Row>
            </Col>
        </Container>
    </>

}
