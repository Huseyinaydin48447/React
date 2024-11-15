import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product details', error);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    alert(`${product.name} sepete eklendi!`);
  };

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found</div>;

  return (
    <div className="product-detail" style={{ padding: '20px', maxWidth: '500px', margin: '0 auto', backgroundColor: '#f0f0f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <img src={product.thumbnail} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      <h2 style={{ margin: '20px 0', textAlign: 'center' }}>{product.title}</h2>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
      <p style={{ margin: '20px 0', color: '#333' }}>{product.description}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Price:</strong> ${product.price}</p>

      
      <button 
        onClick={handleAddToCart} 
        style={{ padding: '10px 20px', marginTop: '20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
        Sepete Ekle
      </button>
    </div>
  );
};

export default ProductDetails;
