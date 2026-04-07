import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import UserList from './components/UserList';
import UserEdit from './components/UserEdit';
import './App.scss';

const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

const getUserRole = () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ children, allowedRoles = null }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(getUserRole())) {
    return <Navigate to="/" />;
  }
  
  return children;
};

function App() {
  const role = getUserRole();
  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            } />
            
            <Route path="/products/new" element={
              <ProtectedRoute allowedRoles={['seller', 'admin']}>
                <ProductForm />
              </ProtectedRoute>
            } />
            
            <Route path="/products/:id" element={
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/products/:id/edit" element={
              <ProtectedRoute allowedRoles={['seller', 'admin']}>
                <ProductForm isEdit={true} />
              </ProtectedRoute>
            } />
            
            <Route path="/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserList />
              </ProtectedRoute>
            } />
            
            <Route path="/users/:id/edit" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <UserEdit />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;