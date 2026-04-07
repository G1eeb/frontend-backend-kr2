import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsAPI } from '../services/api';

const ProductForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', category: '', description: '', price: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      productsAPI.getById(id).then(res => setFormData(res.data)).catch(console.error);
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEdit && id) {
        await productsAPI.update(id, formData);
      } else {
        await productsAPI.create(formData);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка сохранения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? 'Редактировать товар' : 'Добавить товар'}</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Название</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Категория</label>
          <input type="text" name="category" value={formData.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Описание</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Цена</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Сохранение...' : (isEdit ? 'Обновить' : 'Создать')}</button>
      </form>
    </div>
  );
};

export default ProductForm;