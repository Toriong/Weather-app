import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import WeatherApp from './WeatherApp';
import reportWebVitals from './reportWebVitals';
import { WeatherInfoProvider } from './provider/WeatherInfoProvider';
import { ModalProvider } from './provider/ModalProvider';
import { SearchProvider } from './provider/SearchProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <ModalProvider>
        <WeatherInfoProvider>
          <WeatherApp />
        </WeatherInfoProvider>
      </ModalProvider>
    </SearchProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
