import React from 'react';
import { Link } from "react-router-dom";
import logobig from '../../logobig.svg';
import Header from '../header/Header';
import './Style.css';

function Login() {

    return (
        <div>
            <Header component={Header}>
                Вход в систему
            </Header>
            <div className="App-div">
                <div className="container">
                    <img src={logobig} className="App-logobig" alt="logo" />
                    <div className="App-block">
                        <p className="block-tiile">
                            Войти в систему
                        </p>
                        <div className="App-form">
                            <label>Login:</label>
                            <input type="text" placeholder="Login" />
                        </div>
                        <div className="App-form">
                            <label>Password:</label>
                            <input type="text" placeholder="Password" />
                        </div>
                        <div className="App-btn-form">
                            <button className="btn-form">Войти</button>
                            <Link to="/Registration"> <button className="btn-form-auto">Зарегистрироваться </button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login