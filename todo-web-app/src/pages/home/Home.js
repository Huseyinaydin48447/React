import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Table, Spinner, Pagination } from 'react-bootstrap';
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
  const [loadingCheck, setLoadingCheck] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 5; 

  useEffect(() => {
    fetchData();
  }, []);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

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

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setFormData({ text: todo.text, time: todo.time });
    setShowUpdateModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getCurrentDate = () => {
    const sysTime = new Date();
    const fullDate = `${sysTime.getDate()}/${sysTime.getMonth() + 1}/${sysTime.getFullYear()}`;
    return fullDate;
  }

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
    setLoadingCheck(prevState => ({ ...prevState, [todoId]: true }));
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
    } finally {
      setLoadingCheck(prevState => ({ ...prevState, [todoId]: false }));
    }
  };

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todoList.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalTodos = todoList.length;
  const completedTodos = todoList.filter(todo => todo.checked).length;



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
            <th>Text</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentTodos.map((todo, index) => (
            <tr key={index}>
              <td>
                {loadingCheck[todo.id] ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <input
                    type="checkbox"
                    checked={todo.checked}
                    onChange={(e) => handleCheck(todo.id, e.target.checked)}
                  />
                )}
              </td>
              <td style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>{todo.text}</td>
              <td style={{ textDecoration: todo.checked ? 'line-through' : 'none' }}>{todo.time}</td>
              <td style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button variant="success me-2" onClick={() => handleEdit(todo)}>Edit</Button>
                <Button variant="danger" onClick={() => { setSelectedTodo(todo); setShowDeleteModal(true); }}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div>
    <span>Total: {totalTodos}</span> | <span>Completed: {completedTodos}</span>
  </div>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Pagination>
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
      {Array.from({ length: Math.ceil(todoList.length / todosPerPage) }, (_, index) => (
        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
          {index + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(todoList.length / todosPerPage)} />
    </Pagination>
  </div>
</div>


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
