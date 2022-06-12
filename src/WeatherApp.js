import React from 'react';
import WeatherAppMainPage from './WeatherAppMainPage';
import { WeatherInfoProvider } from './provider/WeatherInfoProvider';
import { ModalProvider } from './provider/ModalProvider';
import { SearchProvider } from './provider/SearchProvider';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/index.css';

const WeatherApp = () => {
    return (
        <BrowserRouter>
            <SearchProvider>
                <ModalProvider>
                    <WeatherInfoProvider>
                        <Routes>
                            <Route exact path='/:city/:country' element={<WeatherAppMainPage />} />
                            <Route exact path='/:city/:state/:country' element={<WeatherAppMainPage />} />
                            <Route exact path='/:city' element={<WeatherAppMainPage />} />
                            <Route path='/' element={<WeatherAppMainPage />} />
                            {/* for invalid urls */}
                            <Route path='*' element={<WeatherAppMainPage />} />
                        </Routes>
                    </WeatherInfoProvider>
                </ModalProvider>
            </SearchProvider>
        </BrowserRouter>
    )
}

export default WeatherApp