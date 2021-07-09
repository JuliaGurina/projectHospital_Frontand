import React, { useState } from "react";
import axios from 'axios';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import trash from '../../source/images/trash.svg';
import './Filtr.scss'

const Filtr = ({ onClose, open, tasks, setTasks }) => {
  const [datefilterFrom, setDatefilterFrom] = useState();
  const [datefilterTo, setDatefilterTo] = useState();

  const fetchData = () => {
    axios.get("http://localhost:5000/allTasks", {
      headers:
        { authorization: localStorage.getItem('token') }
    })
      .then((res) => {
        setTasks(res.data.data);
      });
  };

  const filterTasks = () => {
    const arrTasks = [...tasks];
    const newArr = [];
    if (datefilterFrom && datefilterTo) {
      arrTasks.forEach((item) => {
        const newDateFiltr = new Date(item.date.split(".").reverse().join("-"));
        if (newDateFiltr >= datefilterFrom && newDateFiltr <= datefilterTo)
          newArr.push(item);
      })
      setTasks([...newArr]);
    }
    else if (datefilterFrom) {
      arrTasks.forEach((item) => {
        const newDateFiltr = new Date(item.date.split(".").reverse().join("-"));
        if (newDateFiltr >= datefilterFrom)
          newArr.push(item);
      });
      setTasks([...newArr]);
    }
    else if (datefilterTo) {
      arrTasks.forEach((item) => {
        const newDateFiltr = new Date(item.date.split(".").reverse().join("-"));
        if (newDateFiltr >= datefilterTo)
          newArr.push(item);
      });
      setTasks([...newArr]);
    } else {
      fetchData();
    }
  };

  return (
    <div
      open={open}
      onClose={onClose}
      className="filtr-block">
      <div className="App-dom-filtr">
        <label>c:</label>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className="text-name-filtr"
            disableToolbar
            variant="outlined"
            format="dd.MM.yyyy"
            margin="normal"
            id="date-picker-inline"
            value={datefilterFrom}
            onChange={(date) => setDatefilterFrom(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }} />
        </MuiPickersUtilsProvider>
      </div>
      <div className="App-dom-filtr">
        <label>по:</label>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            className="text-name-filtr"
            disableToolbar
            variant="outlined"
            format="dd.MM.yyyy"
            margin="normal"
            id="date-picker-inline"
            value={datefilterTo}
            onChange={(date) => setDatefilterTo(date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }} />
        </MuiPickersUtilsProvider>
      </div>
      <div className="App-dom-filtr">
        <Button
          className="btn-filtr"
          variant="outlined"
          onClick={() => filterTasks()}
        >
          Фильтровать
        </Button>
        <img
          src={trash}
          alt="trash"
          onClick={() => onClose()} />
      </div>
    </div>
  )
}

export default Filtr