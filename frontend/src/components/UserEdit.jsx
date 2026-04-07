import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usersAPI } from '../services/api';

const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role: 'user'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await usersAPI.getById(id);
      setFormData({
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        role: response.data.role
      });
    } catch (err) {
      setError('Ошибка загрузки пользователя');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await usersAPI.update(id, formData);
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка обновления');
    }
  };

  if (loading) return <div className="form-container">Загрузка...</div>;

  return (
    <div className="form-container">
      <h2>Редактирование пользователя</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Фамилия</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Роль</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">Пользователь</option>
            <option value="seller">Продавец</option>
            <option value="admin">Администратор</option>
          </select>
        </div>
        <button type="submit">Сохранить</button>
        <button type="button" className="back-btn" onClick={() => navigate('/users')} style={{ marginTop: '1rem' }}>
          Отмена
        </button>
      </form>
    </div>
  );
};

export default UserEdit;