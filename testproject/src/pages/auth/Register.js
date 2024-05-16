import React from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',

  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = formData;






    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://todo-web-app-flame-server.vercel.app/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: formData
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });


  };

  const handleChange = (event) => {
    const { name, value, } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <Card body title='REGISTER'>

        <h1>Register</h1>
        <Form style={{ marginTop: '20px' }} onSubmit={handleSubmit} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="text" name='username' placeholder="Enter email" required onChange={handleChange} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name='password' placeholder="Password" required onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Reenter Password</Form.Label>
            <Form.Control type="password" name='psw2' placeholder="Password" required />
          </Form.Group>

          <Button variant="primary" disabled={formData.username !== "" && formData.password !== "" ? false : true} type="submit">
            Submit
          </Button>
          <br></br>
          <Form.Text className="text-muted">
            <Link to="/login"><b>Login </b></Link> if you have an account
          </Form.Text>
        </Form>
      </Card>
    </>
  )
}

export default Register