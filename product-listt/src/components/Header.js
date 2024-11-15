import React, { useState } from 'react';
import './Header.css';

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <header className="header">
      <nav>
        <ul>
          <li><a href="/">Anasayfa</a></li>
          <li><a href="/cart">Sepetim</a></li>
          <li><a href="/account">Hesabım</a></li>
        </ul>
      </nav>
      <input
        type="text"
        placeholder="Ürün arayın..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
    </header>
  );
};

export default Header;
