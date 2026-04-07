import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="form-container">Загрузка...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Товары</h1>
      </div>
      <div className="products-grid">
        {products.length === 0 ? (
          <p>Нет товаров</p>
        ) : (
          products.map(product => (
            <div key={product.id} className="product-card" onClick={() => navigate(`/products/${product.id}`)}>
              <h3>{product.title}</h3>
              <div className="category">{product.category}</div>
              <div className="price">{product.price} ₽</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;