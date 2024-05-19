import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import { ProtectedRoute } from './ProtectedRoutej';
import { Error404 } from './pages/error404/Error404';
import secureLocalStorage from 'react-secure-storage';

function App() {
  const isAuthenticated = secureLocalStorage.getItem('userData');
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/home/todolist" /> : <Navigate to="/login" />} />
        <Route path='/home' element={<ProtectedRoute />} >
          <Route path="todolist" element={<Home />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </div>
  );
}

export default App;
