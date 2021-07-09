import React from "react";
import axios from 'axios';
import {
  Modal,
  Backdrop,
  Fade,
  Button
} from '@material-ui/core';
import './ModalDelete.scss';

const ModalDelete = ({ onClose, open, task, setTasks }) => {

  const deleteTask = async () => {
    await axios
      .delete(`http://localhost:5000/deleteTask?_id=${task._id}`,
        {
          headers:
            { authorization: localStorage.getItem('token') }
        })
      .then((res) => {
        setTasks(res.data.data);
      });
    onClose()
  };

  return (
    <div>
      <Modal
        className="modal-style"
        open={open}
        onClose={onClose}
        BackdropComponent={Backdrop}
      >
        <Fade in={open}>
          <div className="fade-style">
            <div className="title-tible">
              <h2 id="spring-modal-title">Удалить приём</h2>
            </div>
            <p id="spring-modal-description">Вы действительно хотите удалить приём?</p>
            <div className="btn-table">
              <Button
                onClick={() => onClose()}
                variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={() => deleteTask()}
                variant="outlined">
                Delete
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default ModalDelete