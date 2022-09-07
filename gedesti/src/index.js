import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from "react-router-dom";

import App from './App';
import Form from './components/Login/Login';
import Header from './components/Fixed/Header/Header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/form" element={<Form />} />
        <Route path="/header" element={<Header/>} />
      </Routes>

    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
