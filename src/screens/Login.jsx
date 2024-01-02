import React, { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../components/AuthContext'
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('test@test')
    const [status, setStatus] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const navigate = useNavigate();
    const { handleAuth, login } = useAuth()
    const handleLogin = async (e) => {
        e.preventDefault();
        setDisabled(true)
        const user = await login(email, password)
        if (user) {
            handleAuth(user)
            setTimeout(() => {
                handleAuth(null);
            }, 1000 * 60 * 60);
            navigate('/main/email')
        } else {
            setDisabled(false)
            setStatus(false)
        }
    }
    return (
        <Container fluid className='d-flex justify-content-center align-items-center' style={{ backgroundColor: '#0e1f33', height: '100vh' }}>
            <Container className="login-container bg-white rounded-3">
                <Row>
                    <Col xs={12} className="logo">
                        <img style={{height:'auto'}} src="./images/connect-logo-black.svg" alt="" />
                    </Col>
                    <Col xs={12} className="text-center mt-2">
                        <p style={{ fontWeight: "100" }}>Login to check your email!</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Select className='email-input shadow-sm' aria-label="Email" size='sm' onChange={e => setEmail(e.target.value)}>
                                    <option value={0}>-------Choose an email</option>
                                    <option value="test1@test.com">test1@test.com</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control className={!status ? 'wrong-password password-input shadow-sm' : 'password-input shadow-sm'} type='password' value={password} size='sm' onChange={e => setPassword(e.target.value)} />
                            </Form.Group>
                            {!status && <Alert variant='danger'>Wrong email or password !!</Alert>}
                            <Button disabled={disabled} type='submit' className='border-0' size='sm' style={{ backgroundColor: '#0e1f33', width: '100%' }} onClick={e => handleLogin(e)}>
                                Login
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}
