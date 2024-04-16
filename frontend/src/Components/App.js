import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Main from './Main'
import LoginForm from './LoginForm'

export default function App() {
    const [showLogin, setShowLogin] = useState(true)
    const [info, setInfo] = useState(false)

    function handleLogin(info) {
        setInfo(info)
        setShowLogin(true)
    }

    function handleLogout() {
        setInfo(false)
        setShowLogin(false)
    }

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route 
                        exact path="/" 
                        element={ showLogin 
                            ?<Main info={info} logout={handleLogout} Login={handleLogin} /> 
                            :<LoginForm Login={handleLogin} />
                        } 
                    />
                    <Route path='*' element={ <Navigate to="/" /> }/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}