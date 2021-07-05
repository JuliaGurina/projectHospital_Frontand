import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from '../header/Header';
import TableName from '../table/TableName';
import Form from '../form/Form'
import './Reception.scss'

const Reception = () => {
	const [tasks, setTasks] = useState([]);
	useEffect(() => {
		axios.get("http://localhost:5000/allTasks", {
			headers:
				{ authorization: localStorage.getItem('token') }
		})
			.then((res) => {
				setTasks(res.data.data);
			});
	}, []);

	return (
		<div>
			<Header button={true}>
				Прием
			</Header>
			<Form setTasks={setTasks} />
			<TableName tasks={tasks} setTasks={setTasks} />
		</div >
	)
}

export default Reception