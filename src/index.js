import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import WeatherApp from './WeatherApp';
import reportWebVitals from './reportWebVitals';
import { WeatherInfoProvider } from './provider/WeatherInfoProvider';
import { ModalProvider } from './provider/ModalProvider';
import { SearchProvider } from './provider/SearchProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <SearchProvider>
      <ModalProvider>
        <WeatherInfoProvider>
          <Routes>
            <Route exact path='/:city/:country' element={<WeatherApp />} />
            <Route exact path='/:city/:state/:country' element={<WeatherApp />} />
            <Route path='/' element={<WeatherApp />} />
            {/* for invalid urls */}
            <Route path='*' element={<WeatherApp />} />
          </Routes>
        </WeatherInfoProvider>
      </ModalProvider>
    </SearchProvider>
  </BrowserRouter>
);


reportWebVitals();
