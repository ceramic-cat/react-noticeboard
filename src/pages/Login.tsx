import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

Login.route = {
    path: '/login',
    menuLabel: 'Log in',
    index: 4
}


// remember to check if someone is already logged in with loader (but later)
export default function Login() {


    const [userData, setUserData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: ''
    })

    function setProperty(event: React.ChangeEvent) {
        let { name, value }: { name: string, value: string } = event.target as HTMLInputElement
        setUserData({ ...userData, [name]: value })
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

    async function sendForm(event: React.FormEvent) {
        event.preventDefault()

        const payload: any = { ...userData }
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            const data: LoginResponse = await response.json()

            if ('error' in data) {
                console.log('error')
            } else {
                console.log('success')
                console.log('hello ' + data.firstName)
            }
        }
        catch (error) {
            console.log('Something went wrong with that request.')
        }

    }
    // example of success body response (200 OK)
    // {
    //   "id": 4,
    //   "created": "2024-04-02",
    //   "email": "olle@nodehill.com",
    //   "firstName": "Olle",
    //   "lastName": "Olofsson",
    //   "role": "user"
    // }

    // user already logged in:
    // {
    //   "error": "A user is already logged in."
    // }

    // invalid username/pasw: (500),
    // {
    //   "error": "Password mismatch."
    // }
    // or 
    //     {
    //   "error": "No such user."
    // }


    return <>
        <Container fluid className='d-flex justify-content-center'>
            <Col sm={6}>
                <Row>
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
