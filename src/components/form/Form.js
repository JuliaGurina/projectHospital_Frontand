import React, { useState } from "react";
import axios from 'axios';
import {
	TextField,
	Select,
	Button
} from '@material-ui/core';
import './Form.scss';

const Form = ({ setTasks }) => {
	const [name, setTextName] = useState("");
	const [doctor, setTextDoctor] = useState("");
	const [date, setTextDate] = useState("");
	const [lament, setTextLament] = useState("");
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
		}]

	const addNewTask = async () => {
		await axios
			.post("http://localhost:5000/createTask", {
				name: name,
				doctor: doctor,
				date: date,
				lament: lament
			}, {
				headers:
					{ authorization: localStorage.getItem('token') }
			})
			.then((res) => {
				setTasks(res.data.data);
				setTextName("");
				setTextDoctor("");
				setTextDate("");
				setTextLament("");
			});
	};

	return (
		<div className="form">
			<div className="App-dom">
				<label>Имя:</label>
				<TextField value={name}
					onChange={(e) => setTextName(e.target.value)}
					type="text"
					id="outlined-basic"
					className="text-name"
					variant="outlined" />
			</div>
			<div className="App-dom">
				<label>Врач:</label>
				<Select variant="outlined"
					className="text-doctor"
					native
					value={doctor}
					onChange={(e) => setTextDoctor(e.target.value)}
				>
					{
						nameDoctors.map((value, index) => <option key={`name-${index}`}>{value.name}</option>)
					}
				</Select>
			</div>
			<div className="App-dom">
				<label>Дата:</label>
				<div>
					<TextField className="text-date"
						onChange={(e) => setTextDate(e.target.value)}
						id="date"
						type="date"
						variant="outlined"
					/>
				</div>
			</div>
			<div className="App-dom">
				<label>Жалобы:</label>
				<TextField
					value={lament}
					onChange={(e) => setTextLament(e.target.value)}
					id="outlined-basic"
					className="text-name"
					variant="outlined" />
			</div>
			<div className="App-dom">
				<Button onClick={() => addNewTask()}
					variant="outlined"
					className="btn-form">
					Добавить
				</Button>
			</div>
		</div>
	)
}

export default Form