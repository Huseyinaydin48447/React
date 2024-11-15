import React from 'react';

const ImageModal = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img 
          src={imageUrl} 
          alt="Enlarged" 
          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} 
        />
        <button 
          className="close-button" 
          onClick={onClose}
          style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
