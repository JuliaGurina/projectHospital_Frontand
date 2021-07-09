import React from 'react';
import { useHistory } from "react-router-dom";
import logoMin from '../../source/images/logoMini.svg';

const Header = (props) => {
	const history = useHistory();

	const outputUse = () => {
		localStorage.clear();
		history.push("/login")
	}

	return (
		<header className="App-header">
			<img src={logoMin} className="App-logomin" alt="logo" />
			<p className="header-tiile">
				{props.children}
			</p>
			{props.button && <button onClick={() => outputUse()} className="App-btn">Выход</button>}
		</header>
	)
}

export default Header