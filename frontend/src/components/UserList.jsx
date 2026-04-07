import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../services/api';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data);
    } catch (err) {
      setError('Ошибка загрузки пользователей');
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (id, email) => {
    if (window.confirm(`Заблокировать пользователя ${email}?`)) {
      try {
        await usersAPI.block(id);
        fetchUsers();
      } catch (err) {
        setError('Ошибка блокировки');
      }
    }
  };

  const getRoleLabel = (role) => {
    switch(role) {
      case 'admin': return 'Администратор';
      case 'seller': return 'Продавец';
      default: return 'Пользователь';
    }
  };

  if (loading) return <div className="form-container">Загрузка...</div>;

  return (
    <div>
      <h1>Управление пользователями</h1>
      {error && <div className="error">{error}</div>}
      
      <div className="products-grid">
        {users.map(user => (
          <div key={user.id} className="product-card">
            <h3>{user.first_name} {user.last_name}</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Роль:</strong> {getRoleLabel(user.role)}</p>
            <p><strong>Статус:</strong> {user.isBlocked ? <span style={{color: 'red'}}>Заблокирован</span> : <span style={{color: 'green'}}>Активен</span>}</p>
            <div className="button-group" style={{ marginTop: '1rem' }}>
              <button 
                className="edit-btn" 
                onClick={() => navigate(`/users/${user.id}/edit`)}
              >
                Редактировать
              </button>
              {!user.isBlocked && (
                <button 
                  className="delete-btn" 
                  onClick={() => handleBlock(user.id, user.email)}
                >
                  Заблокировать
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;