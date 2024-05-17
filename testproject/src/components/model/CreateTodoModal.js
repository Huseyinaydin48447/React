import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

const CreateTodoModal = ({ show, handleClose, formData, handleChange, handleSubmit, handleCancel ,  isSubmitting
}) => {
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    if (!show) {
      setStartDate(new Date()); 
    }
  }, [show]);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formText">
            <Form.Label>Text</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTime">
            <Form.Label>Date</Form.Label>
            <br></br>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                const formattedDate = format(date, 'dd/MM/yyyy');
                handleChange({ target: { name: 'time', value: formattedDate } });
              }}
              dateFormat="dd/MM/yyyy"
            />

          </Form.Group>
          <br></br>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </Button>

          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateTodoModal;
