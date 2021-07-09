import React, { useState } from "react";
import axios from 'axios';
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  TextField,
  Select,
} from '@material-ui/core';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';
import './ModalEdit.scss';

const ModalEdit = ({ onClose, open, setTasks, task }) => {
  const [nameNew, setNameNew] = useState(task.name);
  const [doctorNew, setDoctorNew] = useState(task.doctor);
  const [dateNew, setDateNew] = useState(task.date);
  const [lamentNew, setLamentNew] = useState(task.lament);

  const nameDoctors = [
    {
      name: ""
    },
    {
      name: "Пупкин Пупок Пупкович"
    },
    {
      name: "Врачный Врач Врачевич"
    },
    {
      name: "Иванов Иван Иванович"
    }];

  const doneTask = async () => {
    await axios
      .patch(`http://localhost:5000/updateTask?_id=${task._id}`, {
        name: nameNew,
        doctor: doctorNew,
        date: moment(dateNew).format("DD.MM.YYYY"),
        lament: lamentNew
      }, {
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
          <div className="fade-style-edit">
            <div className="title-tible">
              <h2>Изменить приём</h2>
            </div>
            <div className="App-dom-edit">
              <label>Имя:</label>
              <TextField
                type="text"
                className="text-name"
                variant="outlined"
                value={nameNew}
                onChange={(e) => {
                  setNameNew(e.target.value);
                }} />
            </div>
            <div className="App-dom-edit">
              <label>Врач:</label>
              <Select
                value={doctorNew}
                onChange={(e) => setDoctorNew(e.target.value)}
                className="text-name"
                variant="outlined"
                native
              >
                {
                  nameDoctors.map((value, index) => <option key={`name-${index}`}>{value.name}</option>)
                }
              </Select>
            </div>
            <div className="App-dom-edit">
              <label>Дата:</label>
              <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className="text-date-edit"
                    disableToolbar
                    variant="outlined"
                    format="MM.dd.yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    value={dateNew}
                    onChange={(date) => setDateNew(date)}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }} />
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="App-dom-edit">
              <label>Жалобы:</label>
              <TextField
                value={lamentNew}
                className="text-name"
                onChange={(e) => setLamentNew(e.target.value)}
                variant="outlined" />
            </div>
            <div className="btn-table">
              <Button
                onClick={() => onClose()}
                variant="outlined">
                Cancel
              </Button>
              <Button
                onClick={() => doneTask()}
                variant="outlined">
                Save
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div >
  )
}

export default ModalEdit