import React from 'react';
import logomin from '../../logomini.svg';
// import './Style.css';

function Header(props) {

    return (
        <header className="App-header">
            <img src={logomin} className="App-logomin" alt="logo" />
            <p className="header-tiile">
                {props.children}
            </p>
        </header>
    )
}

export default Header