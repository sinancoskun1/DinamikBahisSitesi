import React, { useState } from 'react';
import { Navbar, Container, Form, Button } from 'react-bootstrap';

export default function AppNavbar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('Hata:', error);
      setMessage('Sunucu hatası oluştu');
    }
  };

  return (
    <Navbar expand="lg" className="custom-navbar bg-danger" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#">KuponLa</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex ms-auto" onSubmit={handleLogin}>
            <Form.Control
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="me-2"
              required
            />
            <Form.Control
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="me-2"
              required
            />
            <Button variant="outline-light" type="submit">
              Giriş
            </Button>
          </Form>
          <p>{message}</p>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}