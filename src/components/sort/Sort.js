import React, { useState } from "react";
import axios from 'axios';
import { Select } from '@material-ui/core';
import Filtr from '../filtr/Filtr';
import plus from '../../source/images/plus.svg';
import './Sort.scss';

const Sort = ({ tasks, setTasks }) => {
  const [sort, setSort] = useState('_id');
  const [direct, setDirect] = useState('asc');
  const [openFiltr, setOpenFiltr] = useState(false);

  const fetchData = () => {
    axios.get("http://localhost:5000/allTasks", {
      headers:
        { authorization: localStorage.getItem('token') }
    })
      .then((res) => {
        setTasks(res.data.data);
      });
  };

  const handleOpenFiltr = () => {
    setOpenFiltr(true);
  };

  const handleCloseFiltr = () => {
    fetchData();
    setOpenFiltr(false);
  };

  const sortName = [
    {
      name: "По умолчанию",
      value: '_id'
    },
    {
      name: "По имени",
      value: 'name'
    },
    {
      name: "По врачу",
      value: 'doctor'
    },
    {
      name: "По дате",
      value: 'date'
    }];

  const sortDirectValue = [
    {
      name: 'По возрастанию',
      value: 'asc'
    },
    {
      name: 'По убыванию',
      value: 'des'
    }
  ];

  const handleSort = (value) => {
    setDirect('asc');
    setSort(value);
    sortTasksData(value, 'asc');
  };

  const handleSortDirect = (value) => {
    setDirect(value);
    sortTasksData(sort, value);
  };

  const sortTasksData = (field, dir) => {
    const tasksDes = [...tasks].sort((a, b) => a[field] > b[field] ? 1 : -1);
    setTasks(dir === 'des' ? tasksDes.reverse() : tasksDes)
  };

  const openDirectionSelect = sort !== '_id';
  return (
    <div className="sort-block">
      <div className="App-dom-sort">
        <label>Сортировать по:</label>
        <Select
          onChange={(e) => handleSort(e.target.value)}
          value={sort}
          className="text-doctor"
          variant="outlined"
          native
        >
          {
            sortName.map((item, index) => <option key={`name-${index}`} value={item.value}>{item.name}</option>)
          }
        </Select>
      </div>
      {openDirectionSelect &&
        <div className="App-dom-sort">
          <label>Направление:</label>
          <Select
            onChange={(e) => handleSortDirect(e.target.value)}
            value={direct}
            className="text-doctor"
            variant="outlined"
            native
          >
            {
              sortDirectValue.map((item, index) => <option key={`name-${index}`} value={item.value}>{item.name}</option>)
            }
          </Select>
        </div>
      }
      <label>Добавить фильтр по дате:</label>
      <img
        onClick={() => handleOpenFiltr()}
        className="img-plus"
        alt="plus"
        src={plus} />
      {
        openFiltr && <Filtr
          setTasks={setTasks}
          tasks={tasks}
          open={openFiltr}
          onClose={handleCloseFiltr}
        />
      }
    </div >
  )
}

export default Sort