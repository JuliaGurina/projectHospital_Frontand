import React, { useState } from "react";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import moment from 'moment';
import axios from 'axios';
import {
	TextField,
	Select,
	Button
} from '@material-ui/core';
import './Form.scss';

const Form = ({ setTasks }) => {
	const d = moment().format('L');
	const [name, setTextName] = useState("");
	const [doctor, setTextDoctor] = useState("");
	const [date, setTextDate] = useState(d);
	const [lament, setTextLament] = useState("");
	const nameDoctors = [
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
		if (name.trim() && date && lament.trim()) {
			await axios
				.post("http://localhost:5000/createTask", {
					name: name,
					doctor: doctor,
					date: moment(date).format('DD.MM.YYYY'),
					lament: lament
				}, {
					headers:
						{ authorization: localStorage.getItem('token') }
				})
				.then((res) => {
					setTasks(res.data.data);
					setTextName("");
					setTextDoctor("");
					setTextDate(d);
					setTextLament("");
				});
		} else {
			alert("Заполните все поля");
		}
	};

	return (
		<div className="form">
			<div className="App-dom">
				<label>Имя:</label>
				<TextField
					placeholder="Ф.И.О."
					value={name}
					onChange={(e) => setTextName(e.target.value)}
					type="text"
					id="outlined-basic"
					className="text-name"
					variant="outlined" />
			</div>
			<div className="App-dom">
				<label>Врач:</label>
				<Select
					variant="outlined"
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
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							className="text-date"
							disableToolbar
							variant="outlined"
							format="dd.MM.yyyy"
							margin="normal"
							id="date-picker-inline"
							value={date}
							onChange={(d) => setTextDate(d)}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}} />
					</MuiPickersUtilsProvider>
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
				<Button
					onClick={() => addNewTask()}
					variant="outlined"
					className="btn-form">
					Добавить
				</Button>
			</div>
		</div>
	)
}

export default Form