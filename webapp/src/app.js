import React from 'react';
import { render } from 'react-dom';
import Main from './components/Main';

const renderApp = () => {
	
    render(
        <Main />,
        document.querySelector('[data-js="main"]')
    );
};

renderApp();
