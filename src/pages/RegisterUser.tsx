import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type userInfo from '../interfaces/UserInfo';

RegisterUser.route = {
    path: '/register-user',
    menuLabel: 'Register User',
    index: 4
}

export default function RegisterUser() {
    const [registerPayload, setRegisterPayload] = useState({
        email: '',
        password:'',
        firstName: '',
        lastName: ''
    })

    return <>
    <Container>
        <Col sm={6}>
        <Row>
            
            </Row>
            </Col>
    </Container>
    </>
}
