import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'; 

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://recipback.onrender.com/products');
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h1> Recips </h1>
      {error && <p className="products-error">{error}</p>}
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-details">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-ingredients">{product.ingredients}</p>
              <a href={product.link} className="product-link">More details</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
