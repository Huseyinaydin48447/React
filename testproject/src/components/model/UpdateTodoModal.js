import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';

import 'react-datepicker/dist/react-datepicker.css';

const UpdateTodoModal = ({ show, handleClose, formData, handleChange, handleSubmit, handleCancel }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Todo</Modal.Title>
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
                const formattedDate = format(date, 'dd-MM-yyyy');
                handleChange({ target: { name: 'time', value: formattedDate } });
              }}
              dateFormat="dd/MM/yyyy"
            />

          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateTodoModal;
