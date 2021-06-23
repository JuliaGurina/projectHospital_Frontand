import React from 'react';
import { Link } from "react-router-dom"
import logobig from '../../logobig.svg';
import Header from '../header/Header';
import './Style.css';

function Registration() {

    return (
        <div>
            <Header component={Header}>
                Зарегистрироваться в системе
            </Header>
            <div className="App-div">
                <div className="container">
                    <img src={logobig} className="App-logobig" alt="logo" />
                    <div className="App-block">
                        <p className="block-tiile">
                            Регистрация
                        </p>
                        <div className="App-login">
                            <label>Login:</label>
                            <input type="text" placeholder="Login" />
                        </div>
                        <div className="App-login">
                            <label>Password:</label>
                            <input type="text" placeholder="Password" />
                        </div>
                        <div className="App-login">
                            <label>Repeat password:</label>
                            <input type="text" placeholder="Password" />
                        </div>
                        <div className="App-btn">
                            <button className="btn">Зарегистрироваться</button>
                            <Link to="/login"><button className="btn-auto">Авторизоваться </button></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Registration;