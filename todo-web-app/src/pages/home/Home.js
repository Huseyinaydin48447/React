import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import CreateTodoModal from '../../components/model/CreateTodoModal';
import DeleteTodoModal from '../../components/model/DeleteTodoModal';
import UpdateTodoModal from '../../components/model/UpdateTodoModal';
import PDFDownloader from '../../components/PDFDownloader/PDFDownloader'; 
import secureLocalStorage from 'react-secure-storage';

const Home = () => {
  const GetToken = JSON.parse(secureLocalStorage.getItem('userData'));
  const [todoList, setTodoList] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [formData, setFormData] = useState({ text: '', time: null });
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/getAll`, {
        headers: {
          'Authorization': `Bearer ${GetToken?.JWTAccessToken}`
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

  const getCurrentDate = ()=> {
    const sysTime = new Date();
    const fullDate =  `${sysTime.getDate()}/${sysTime.getMonth()+1}/${sysTime.getFullYear()}`
    //console.log(`${sysTime.getDate()}/${sysTime.getMonth()+1}/${sysTime.getFullYear()}`)
    return fullDate;
  }

  // Handle submit
// Handle submit
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true); 
  try {
    const config = {
      method: selectedTodo ? 'put' : 'post',
      url: selectedTodo
      ? `${process.env.REACT_APP_API_ENDPOINT}/update/${selectedTodo.id}`
      : `${process.env.REACT_APP_API_ENDPOINT}/create`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GetToken?.JWTAccessToken}`
      },
      data: {
        text: formData.text,
        time: formData.time ? formData.time : getCurrentDate()
      }
    };

    const response = await axios(config);
    console.log(response.data);
    setShowUpdateModal(false);
    setShowAddForm(false);
    setFormData({ text: '', time: null }); 
    fetchData();
  } catch (error) {
    console.error('Error updating/creating todo:', error);
    alert('Bir hata oluştu, lütfen tekrar deneyin.');
    
  } finally {
    setIsSubmitting(false); 
  }
};


  // Handle delete
  const handleDelete = async (todoId) => {
    if (isDeleting) return; 
    setIsDeleting(true); 

    try {
      const config = {
        method: 'delete',
        url: `${process.env.REACT_APP_API_ENDPOINT}/delete/${todoId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GetToken?.JWTAccessToken}`
        }
      };

      const response = await axios(config);
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error('Error deleting todo:', error);
    } finally {
      setIsDeleting(false); 
      setShowDeleteModal(false);
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
    setFormData({ text: '', time: null });

  };

  const handleCheck = async (todoId, isChecked) => {
    try {
      const data = {
        checked: isChecked
      };
  
      const config = {
        method: 'put',
        url: `${process.env.REACT_APP_API_ENDPOINT}/updateCheck/${todoId}`,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GetToken?.JWTAccessToken}`
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
        isSubmitting={isSubmitting}

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
                <Button variant="danger" onClick={() => { setSelectedTodo(todo); setShowDeleteModal(true); }}>Delete</Button>
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
        isLoading={isDeleting}
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
