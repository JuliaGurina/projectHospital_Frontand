import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import logobig from '../../source/images/logobig.svg';
import Header from '../header/Header';
import axios from 'axios';
import './Login.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Login = () => {
    let history = useHistory();

    const [login, setTextLog] = useState("");
    const [password, setTextPass] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        await axios.post("http://localhost:5000/login", {
            email: formData.get("login"),
            password: formData.get("password"),
        }).then((result) => {
            localStorage.setItem("token", result.data.token)
            history.push("/reception")
        });
    }

    return (
        <div>
            <Header>
                Войти в систему
            </Header>
            <div className="App-div">
                <div className="container">
                    <img src={logobig} className="App-logobig" alt="logo" />
                    <form onSubmit={handleSubmit} className="App-block">
                        <p className="block-tiile">
                            Войти в систему
                        </p>
                        <div className="App-form">
                            <label>Login:</label>
                            <TextField name="login" type="email" value={login} onChange={(e) => setTextLog(e.target.value)} placeholder="Login" variant="outlined" />
                        </div>
                        <div className="App-form">
                            <label>Password:</label>
                            <TextField name="password" type="text" value={password} onChange={(e) => setTextPass(e.target.value)} placeholder="Password" variant="outlined" />
                        </div>
                        <div className="App-btn-form">
                            <Button variant="outlined" type="submit" className="btn-form">Войти</Button>
                            <Link to="/registration" className="btn-form-auto">Зарегистрироваться </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login