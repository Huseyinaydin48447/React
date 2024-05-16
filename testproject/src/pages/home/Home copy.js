import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null); 
  const [formData, setFormData] = useState({
    text: '',
    time: ''
  });
  const [showForm, setShowForm] = useState(false); 
  const [showAddForm, setShowAddForm] = useState(false); 

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://todo-web-app-flame-server.vercel.app/getAll', {
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTcxNTc5ODc0NSwiZXhwIjoxNzE4MzkwNzQ1fQ.9rQrIW9sWPuiSnoL4X_4CAEiDuCqGVvbdhk9uDDN_cs'
        }
      });
      setTodoList(response.data.todoList); 
    } catch (error) {
      console.error('Error fetching todo list:', error);
    }
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setFormData({
      text: todo.text,
      time: todo.time
    });
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let config;
      if (selectedTodo) {
        
        config = {
          method: 'put',
          url: `https://todo-web-app-flame-server.vercel.app/update/${selectedTodo.id}`,
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTcxNTc5ODc0NSwiZXhwIjoxNzE4MzkwNzQ1fQ.9rQrIW9sWPuiSnoL4X_4CAEiDuCqGVvbdhk9uDDN_cs'
          },
          data: formData
        };
      } else {
       
        config = {
          method: 'post',
          url: 'https://todo-web-app-flame-server.vercel.app/create',
          headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTcxNTc5ODc0NSwiZXhwIjoxNzE4MzkwNzQ1fQ.9rQrIW9sWPuiSnoL4X_4CAEiDuCqGVvbdhk9uDDN_cs'
          },
          data: formData
        };
      }

      const response = await axios(config);
      console.log(response.data);
      setShowForm(false);
      setShowAddForm(false);
      fetchData();
    } catch (error) {
      console.error('Error updating/creating todo:', error);
    }
  };

  const handleDelete = async (todoId) => {
    try {
      const config = {
        method: 'delete',
        url: `https://todo-web-app-flame-server.vercel.app/delete/${todoId}`,
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTcxNTc5ODc0NSwiZXhwIjoxNzE4MzkwNzQ1fQ.9rQrIW9sWPuiSnoL4X_4CAEiDuCqGVvbdhk9uDDN_cs'
        }
      };

      const response = await axios(config);
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleCancel = () => {
    setSelectedTodo(null);
    setFormData({
      text: '',
      time: ''
    });
    setShowForm(false);
    setShowAddForm(false); 
  };

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleAddButtonClick}>Add</Button>
      {showAddForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formText">
            <Form.Label>Text</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter text" 
              name="text"
              value={formData.text}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter time" 
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>text</th>
            <th>time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todoList.map((todo, index) => (
            <tr key={index}>
              <td>{todo.text}</td>
              <td>{todo.time}</td>
              <td style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
                <span style={{ justifyContent: 'space-evenly' }}>
                  <Button variant="secondary" onClick={() => handleEdit(todo)}>Edit</Button>
                  <Button variant="secondary" onClick={() => handleDelete(todo.id)}>Delete</Button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formText">
            <Form.Label>Text</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter text" 
              name="text"
              value={formData.text}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formTime">
            <Form.Label>Time</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter time" 
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      )}
    </>
  );
};

export default Home;
