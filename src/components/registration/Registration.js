import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom"
import axios from 'axios';
import { Button, TextField, Snackbar } from '@material-ui/core';
import logoBig from '../../source/images/logoBig.svg';
import Header from '../header/Header';
import './Registration.scss';

const Registration = () => {
	const history = useHistory();
	const [login, setTextLog] = useState("");
	const [password, setTextPass] = useState("");
	const [repeatpass, setTextRep] = useState("");
	const [open, setOpen] = React.useState(false);
	const [openText, setOpenText] = React.useState('');
	const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target)
		if (login.length >= 6) {
			if (password.match(regex)) {
				if (password === repeatpass) {
					await axios.post("http://localhost:5000/register", {
						email: formData.get("login"),
						password: formData.get("password"),
					}).then((result) => {
						localStorage.setItem("token", result.data.token);
						history.push("/reception");
					})
						.catch(() => {
							setOpenText('Такой пользователь уже существует');
							setOpen(true);
						});
					setTextLog('');
					setTextPass('');
					setTextRep('');

				} else {
					setOpenText('Пароли не совпадают ');
					setOpen(true);
				}
			} else {
				setOpenText('В пароле должно быть не менее 6 символов. Пароль должен содержать хотя бы одно число, одну заглавная букву и одну прописную без специальных символов');
				setOpen(true);
			}
		} else {
			setOpenText('Логин должен содержать минимум 6 символов');
			setOpen(true);
		}
	}

	return (
		<div>
			<Header>
				Зарегистрироваться в системе
			</Header>
			<div className="App-div">
				<div className="container">
					<img src={logoBig} className="App-logobig" alt="logo" />
					<form onSubmit={handleSubmit} className="App-block">
						<p className="block-tiile">
							Регистрация
						</p>
						<div className="App-login">
							<label>Login:</label>
							<TextField
								className="text-block"
								name="login"
								type="email"
								value={login}
								onChange={(e) => setTextLog(e.target.value)}
								placeholder="Login"
								variant="outlined" />
						</div>
						<div className="App-login">
							<label>Password:</label>
							<TextField
								className="text-block"
								name="password"
								type="text"
								value={password}
								onChange={(e) => setTextPass(e.target.value)}
								placeholder="Password"
								variant="outlined" />
						</div>
						<div className="App-login">
							<label>Repeat password:</label>
							<TextField
								className="text-block"
								name="repeatpass"
								type="text"
								value={repeatpass}
								onChange={(e) => setTextRep(e.target.value)}
								placeholder="Password"
								variant="outlined" />
						</div>
						<div className="Btn-reg">
							<Button
								variant="outlined"
								type="submit"
								className="btn">
								Зарегистрироваться
							</Button>
							<Link
								to="/login"
								className="btn-auto">
								Авторизоваться
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
				message={openText}
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

export default Registration;