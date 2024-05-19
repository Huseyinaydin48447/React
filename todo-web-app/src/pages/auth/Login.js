import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';

const Login = ({ setLoggedInUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async () => {
    const { username, password } = formData;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/login`,
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const userData = {
        username: response.data.finalData.userDetails,
        JWTAccessToken: response.data.finalData.JWTAccessToken,
      };
      secureLocalStorage.setItem('userData', JSON.stringify(userData));

      navigate('/home/todolist');
      console.log('Login response:', response.data);
      console.log('Login response data:', JSON.stringify(response.data));
    } catch (error) {
      console.error('Login error:', error);
      message.error('Yanlış kullanıcı adı veya şifre');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={{ background: '#141414', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card
        title={'Login'}
        style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', width: '400px' }}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
          >
            <Input
              placeholder="Kullanıcı Adı"
              size='large'
              name="username"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
          >
            <Input.Password
              placeholder="Şifre"
              size='large'
              name="password"
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!formData.username || !formData.password}
            >
             Login
            </Button>
          </Form.Item>

          <Form.Item>
            <span>Don't have an account?  <Link to="/register"><b>Register here!</b></Link></span>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
