import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LayoutFooter from '../../layout/LayoutFooter';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/register`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(JSON.stringify(response.data));
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div style={{ background: '#141414', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
        <Card
          title={'TODO APP REGISTER USER'}
          style={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '5vh', width: '400px' }}
        >
          <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <div style={{ marginBottom: '16px'}}>
              <label htmlFor="username" style={{ display: 'block', marginBottom: '8px' }}>
                <span style={{ color: 'red' }}>*</span>Username
              </label>
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Lütfen username adresinizi girin!' }]}
                hasFeedback
              >
                <Input
                  placeholder="username"
                  size='large'
                  name="username"
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '8px' }}> <span style={{ color: 'red' }}>*</span>Password</label>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Lütfen şifrenizi girin!' }]}
                hasFeedback
              >
                <Input.Password
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="confirm" style={{ display: 'block', marginBottom: '8px' }}> <span style={{ color: 'red' }}>*</span>Confirm Password</label>
              <Form.Item
                name="confirm"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Lütfen şifrenizi tekrar girin!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('İki şifre birbiriyle uyuşmuyor!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  name="confirm"
                />
              </Form.Item>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                disabled={!formData.username || !formData.password}
              >
                Kayıt Ol
              </Button>
              <br></br>
              <label style={{ display: 'block', marginBottom: '8px' }}>Already have an account?  <Link to="/login"><b>Login here!</b></Link> </label>
            </Form.Item>
          </Form>
        </Card>
      </div>
      <LayoutFooter   />
    </div>
  );
};

export default Register;
