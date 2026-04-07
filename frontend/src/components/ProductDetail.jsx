import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { productsAPI } from '../services/api';

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    productsAPI.getById(id).then(res => {
      setProduct(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Удалить товар?')) {
      await productsAPI.delete(id);
      navigate('/');
    }
  };

  if (loading) return <div className="form-container">Загрузка...</div>;
  if (!product) return <div className="form-container">Товар не найден</div>;

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <p><strong>Категория:</strong> {product.category}</p>
      <p><strong>Цена:</strong> {product.price} ₽</p>
      <p><strong>Описание:</strong> {product.description}</p>
      <div className="button-group">
        {(role === 'seller' || role === 'admin') && (
          <button className="edit-btn" onClick={() => navigate(`/products/${id}/edit`)}>Редактировать</button>
        )}
        {role === 'admin' && (
          <button className="delete-btn" onClick={handleDelete}>Удалить</button>
        )}
        <button className="back-btn" onClick={() => navigate('/')}>Назад</button>
      </div>
    </div>
  );
};

export default ProductDetail;