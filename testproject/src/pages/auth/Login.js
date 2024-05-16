import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

const Login = ({ setLoggedInUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username, password } = formData;

    try {
      const response = await axios.post(
        'https://todo-web-app-flame-server.vercel.app/login',
        {
          username: username,
          password: password, 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImlhdCI6MTcxNTYxNzczMiwiZXhwIjoxNzE4MjA5NzMyfQ.k6ZRaAcbNoRPEZVIVxM6ltZoePBcyeIf2Y_cCmTr3Po',
          },
        }
      );

   
      const userData = {
        username: response.data.finalData.userDetails, 
        JWTAccessToken: response.data.finalData.JWTAccessToken
      };
      secureLocalStorage.setItem('userData', JSON.stringify(userData));
    
      navigate('/home'); // Navigate to the Home component
      console.log('Login response:', response.data);
      console.log('Login response data:', JSON.stringify(response.data));

    } catch (error) {
      console.error('Login error:', error);
      alert('Yanlış kullanıcı adı veya şifre');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Form style={{ marginTop: '20px' }} onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='username' required onChange={handleChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' required onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      <br></br>
      <Form.Text className="text-muted">
        If you don't have an account, <Link to="/register"><b>sign up</b></Link>
      </Form.Text>
    </Form>
  );
};

export default Login;
