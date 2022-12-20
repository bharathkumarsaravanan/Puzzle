import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Authentication/Login";
import SignUp from './Authentication/SignUp';
import './App.css';
import Home from "./Home/Home"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/:mail/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
);

