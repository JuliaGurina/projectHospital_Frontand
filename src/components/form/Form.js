import React, { useState } from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import './Form.scss';

const Form = ({ setTasks }) => {
    const [name, setTextName] = useState("");
    const [doctor, setTextDoctor] = useState("");
    const [date, setTextDate] = useState("");
    const [lament, setTextLament] = useState("");

    const addNewTask = async () => {
        await axios
            .post("http://localhost:5000/createTask", {
                name: name,
                doctor: doctor,
                date: date,
                lament: lament
            }, { headers: { authorization: localStorage.getItem('token') } })
            .then((res) => {
                setTasks(res.data.data);
                setTextName("");
                setTextDoctor("");
                setTextDate("");
                setTextLament("");
            });
    };

    return (
        <form className="form">
            <div className="App-dom">
                <label>Имя:</label>
                <TextField value={name} onChange={(e) => setTextName(e.target.value)} type="text" id="outlined-basic" className="text-name" variant="outlined" />
            </div>
            <div className="App-dom">
                <label>Врач:</label>
                <FormControl variant="outlined" className="text-doctor" >
                    <Select
                        native
                        value={doctor}
                        onChange={(e) => setTextDoctor(e.target.value)}
                    >
                        <option aria-label="None" value="" />
                        <option>Пупкин Пупок Пупкович</option>
                        <option>Врачный Врач Врачевич</option>
                        <option>Иванов Иван Иванович</option>
                    </Select>
                </FormControl>
            </div>
            <div className="App-dom">
                <label>Дата:</label>
                <div>
                    <FormControl className="text-date" >
                        <TextField
                            onChange={(e) => setTextDate(e.target.value)}
                            id="date"
                            type="date"
                            variant="outlined"
                        />
                    </FormControl>
                </div>
            </div>
            <div className="App-dom">
                <label>Жалобы:</label>
                <TextField value={lament} onChange={(e) => setTextLament(e.target.value)} id="outlined-basic" className="text-name" variant="outlined" />
            </div>
            <div className="App-dom">
                <Button onClick={() => addNewTask()} variant="outlined" className="btn-form">Добавить</Button>
            </div>
        </form>
    )
}

export default Form