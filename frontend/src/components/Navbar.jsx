import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <nav style={{ background: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea', textDecoration: 'none' }}>Product Manager</Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {isAuth ? (
          <>
            <Link to="/" style={{ color: '#333', textDecoration: 'none', padding: '0.5rem 1rem' }}>Товары</Link>
            <Link to="/products/new" style={{ color: '#333', textDecoration: 'none', padding: '0.5rem 1rem' }}>Добавить товар</Link>
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 1rem' }}>Выйти</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#333', textDecoration: 'none', padding: '0.5rem 1rem' }}>Вход</Link>
            <Link to="/register" style={{ color: '#333', textDecoration: 'none', padding: '0.5rem 1rem' }}>Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;