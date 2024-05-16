import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import CreateTodoModal from '../../components/model/CreateTodoModal';
import DeleteTodoModal from '../../components/model/DeleteTodoModal';
import UpdateTodoModal from '../../components/model/UpdateTodoModal';
import { API_ENDPOINT, API_TOKEN } from '../../components/model/constants';
import PDFDownloader from '../../components/PDFDownloader/PDFDownloader'; 

const Home = () => {
  const [todoList, setTodoList] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [formData, setFormData] = useState({ text: '', time: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // Fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/getAll`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      setTodoList(response.data.todoList);
    } catch (error) {
      console.error('Error fetching todo list:', error);
    }
  };

  // Handle edit
  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setFormData({ text: todo.text, time: todo.time });
    setShowUpdateModal(true);
  };

  // Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        method: selectedTodo ? 'put' : 'post',
        url: selectedTodo
        ? `${API_ENDPOINT}/update/${selectedTodo.id}`
        : `${API_ENDPOINT}/create`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        data: formData
      };

      const response = await axios(config);
      console.log(response.data);
      setShowUpdateModal(false);
      setShowAddForm(false);
      fetchData();
    } catch (error) {
      console.error('Error updating/creating todo:', error);
    }
  };

  // Handle delete
  const handleDelete = async (todoId) => {
    try {
      const config = {
        method: 'delete',
        url: `${API_ENDPOINT}/delete/${todoId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
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
    setFormData({ text: '', time: '' });
    setShowAddForm(false);
    setShowUpdateModal(false);
  };

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  const handleCheck = async (todoId, isChecked) => {
    try {
      const data = {
        checked: isChecked
      };
  
      const config = {
        method: 'put',
        url: `${API_ENDPOINT}/updateCheck/${todoId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`
        },
        data: data
      };
  
      const response = await axios(config);
      console.log(response.data);
  
      fetchData();
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  return (
    <>
      <Button variant="warning me-2" onClick={handleAddButtonClick}>Add</Button>
      <PDFDownloader tableData={todoList} /> 
      <CreateTodoModal
        show={showAddForm}
        handleClose={() => setShowAddForm(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>text</th>
            <th>time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {todoList.map((todo, index) => (
          <tr key={index}>
            <td>
              <input
                type="checkbox"
                checked={todo.checked} 
                onChange={(e) => handleCheck(todo.id, e.target.checked)}
              />
            </td>
            <td>{todo.text}</td>
            <td>{todo.time}</td>
            <td style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'flex-end' }}>
              <span style={{ justifyContent: 'space-evenly' }}>
                <Button variant="success me-2 " onClick={() => handleEdit(todo)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(todo.id)}>Delete</Button>
              </span>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>

      <DeleteTodoModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={() => handleDelete(selectedTodo.id)}
      />

      <UpdateTodoModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default Home;
