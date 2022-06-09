import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import WeatherApp from './WeatherApp';
import reportWebVitals from './reportWebVitals';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WeatherApp />);


reportWebVitals();
