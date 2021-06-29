import React from 'react';
import { useHistory } from "react-router-dom"
import logomin from '../../source/images/logomini.svg';

const Header = (props) => {
    let history = useHistory();

    const outputUse = () => {
        localStorage.clear();
        history.push("/login")
    }

    return (
        <header className="App-header">
            <img src={logomin} className="App-logomin" alt="logo" />
            <p className="header-tiile">
                {props.children}
            </p>
            {props.button && <button onClick={() => outputUse()} className="App-btn">Выход</button>}
        </header>
    )
}

export default Header