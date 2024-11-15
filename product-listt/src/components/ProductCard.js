import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReviewClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div>
      <div className="product-card">
        <div className="product-info">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src={product.thumbnail} 
              alt="thumbnail" 
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
              onClick={openModal} 
            />
          </div>
          <h3>{product.title}</h3>
          <p>{product.description}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <button 
            onClick={handleReviewClick} 
            style={{ display: 'block', margin: '10px auto', padding: '10px 20px', cursor: 'pointer', borderRadius: '8px', backgroundColor: '#007BFF', color: '#fff', border: 'none' }}
          >
            Bilgi
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={product.thumbnail} alt="Enlarged" style={{ maxWidth: '100%', maxHeight: '80vh', borderRadius: '8px' }} />
            <button 
              className="review-button" 
              onClick={handleReviewClick}
              style={{ display: 'block', margin: '10px auto', padding: '10px 20px', cursor: 'pointer', borderRadius: '8px', backgroundColor: '#007BFF', color: '#fff', border: 'none' }}
            >
              İnceleme
            </button>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
