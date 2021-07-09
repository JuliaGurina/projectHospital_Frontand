import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { Button, TextField, Snackbar } from '@material-ui/core';
import logoBig from '../../source/images/logoBig.svg';
import Header from '../header/Header';
import './Login.scss';

const Login = () => {
	const history = useHistory();
	const [login, setTextLog] = useState("");
	const [password, setTextPass] = useState("");
	const [open, setOpen] = React.useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		await axios.post("http://localhost:5000/login", {
			email: formData.get("login"),
			password: formData.get("password"),
		}).then((result) => {
			localStorage.setItem("token", result.data.token);
			history.push("/reception");
		})
			.catch((e) => {
				setOpen(true)
			})
		setTextLog('');
		setTextPass('');
	}

	return (
		<div>
			<Header>
				Войти в систему
			</Header>
			<div className="App-div">
				<div className="container">
					<img src={logoBig} className="App-logobig" alt="logo" />
					<form onSubmit={handleSubmit} className="App-block">
						<p className="block-tiile">
							Войти в систему
						</p>
						<div className="App-form">
							<label>Login:</label>
							<TextField
								name="login"
								type="email"
								value={login}
								onChange={(e) => setTextLog(e.target.value)}
								placeholder="Login"
								variant="outlined" />
						</div>
						<div className="App-form">
							<label>Password:</label>
							<TextField
								name="password"
								type="text"
								value={password}
								onChange={(e) => setTextPass(e.target.value)}
								placeholder="Password"
								variant="outlined" />
						</div>
						<div className="App-btn-form">
							<Button
								variant="outlined"
								type="submit"
								className="btn-form"
							>
								Войти
							</Button>
							<Link
								to="/registration"
								className="btn-form-auto">
								Зарегистрироваться
							</Link>
						</div>
					</form>
				</div>
			</div>
			<Snackbar
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				open={open}
				autoHideDuration={6000}
				onClose={() => setOpen(false)}
				message="Не правильно ввели пароль или логин"
				action={
					<React.Fragment>
						<Button color="secondary" size="small" onClick={() => setOpen(false)}>
							OK
						</Button>
					</React.Fragment>
				}
			/>
		</div>
	)
}

export default Login