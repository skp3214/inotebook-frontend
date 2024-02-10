import React, { useState } from 'react';
import { useNavigate}  from 'react-router-dom';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        password: ''
        , email: ''
    });

    let history=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`https://yournotes-ucsi.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:formData.email, password:formData.password })
        });
        const json=await response.json();
        if(json.success){
           localStorage.setItem('token',json.authtoken);
           history('/');
           
        }
        else{
            alert("Not logined")
            history('/login');
        }
    };
    const onChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }

    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col md={6}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                name='email'
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name='password'
                                placeholder="Password"
                                value={formData.password}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" className='my-3' type="submit">
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginForm;
