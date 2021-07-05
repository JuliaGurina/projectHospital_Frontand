import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom"
import logoBig from '../../source/images/logoBig.svg';
import Header from '../header/Header';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './Registration.scss';

const Registration = () => {
	const history = useHistory();

	const [login, setTextLog] = useState("");
	const [password, setTextPass] = useState("");
	const [repeatpass, setTextRep] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target)

		if (!(password === repeatpass)) {
			alert("БЛАБЛА")
		} else {
			await axios.post("http://localhost:5000/register", {
				email: formData.get("login"),
				password: formData.get("password"),
			}).then((result) => {
				localStorage.setItem("token", result.data.token);
				history.push("/reception");
			});
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
		</div>
	)
}

export default Registration;