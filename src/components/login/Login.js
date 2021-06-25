import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import logobig from '../../logobig.svg';
import Header from '../header/Header';
import axios from 'axios';
import './Logstyle.css';

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
            localStorage.setItem("token", JSON.stringify(result.data.token))
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
                            <input name="login" type="email" value={login} onChange={(e) => setTextLog(e.target.value)} placeholder="Login" />
                        </div>
                        <div className="App-form">
                            <label>Password:</label>
                            <input name="password" type="text" value={password} onChange={(e) => setTextPass(e.target.value)} placeholder="Password" />
                        </div>
                        <div className="App-btn-form">
                            <button type="submit" className="btn-form">Войти</button>
                            <Link to="/registration" className="btn-form-auto">Зарегистрироваться </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login