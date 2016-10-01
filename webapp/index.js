import React from 'react';
import { render } from 'react-dom';

const renderApp = () => {
    render(
        <div>My app goes here</div>,
        document.querySelector('[data-js="main"]')
    );
};

renderApp();
