import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter } from "react-router-dom";

import { ParallaxProvider } from 'react-scroll-parallax';

ReactDOM.render(



    <ParallaxProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </ParallaxProvider>
    , document.getElementById('root'));
registerServiceWorker();
