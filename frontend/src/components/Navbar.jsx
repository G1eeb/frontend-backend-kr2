import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem('accessToken');
  
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
  
  const role = getUserRole();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav style={{ background: 'white', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea', textDecoration: 'none' }}>Product Manager</Link>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {isAuth ? (
          <>
            <Link to="/" style={{ color: '#333', textDecoration: 'none', padding: '0.5rem 1rem' }}>Товары</Link>
            
            {(role === 'seller' || role === 'admin') && (
              <Link to="/products/new" style={{ color: '#333', textDecoration: 'none', padding: '0.5rem 1rem' }}>Добавить товар</Link>
            )}
            
            {role === 'admin' && (
              <Link to="/users" style={{ color: '#333', textDecoration: 'none', padding: '0.5rem 1rem' }}>Пользователи</Link>
            )}
            
            <span style={{ color: '#667eea', marginLeft: '1rem' }}>
              {role === 'admin' ? '👑 Админ' : role === 'seller' ? '🛒 Продавец' : '👤 Пользователь'}
            </span>
            
            <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem 1rem', color: '#e74c3c' }}>Выйти</button>
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