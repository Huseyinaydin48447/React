import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FaBars, FaChevronDown, FaChevronUp, FaTimes } from 'react-icons/fa'; // FaTimes ikonunu ekleyelim
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import ProductCard from './components/ProductCard';
import './App.css';
import Header from './components/Header';

const useDebounce = (func, delay) => {
  let debounceTimer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState([0, 1000]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=200')
      .then(response => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
        setLoading(false);
      });
  }, []);


  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
    let filtered = products.filter(product => {
      const name = product.name ? product.name.toLowerCase() : '';
      const description = product.description ? product.description.toLowerCase() : '';
  
      return (
        name.includes(term.toLowerCase()) ||
        description.includes(term.toLowerCase())
      );
    });
    setFilteredProducts(filtered);
  }, [products]);
  

  const handleDebouncedSearch = useDebounce((term) => {
    handleSearch(term);
  }, 300); 

  useEffect(() => {
    let filtered = products.filter(product => {
      if (categoryFilter && product.category !== categoryFilter) {
        return false;
      }
      if (product.price < priceFilter[0] || product.price > priceFilter[1]) {
        return false;
      }
      if (searchTerm && !(product.name && product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }
      return true;
    });
    if (sortOrder === 'asc') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
  }, [categoryFilter, priceFilter, sortOrder, searchTerm, products]);

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setIsCategoryListOpen(false);
  };

  const handlePriceChange = (e) => {
    const newPriceFilter = [...priceFilter];
    newPriceFilter[0] = Number(e.target.value);
    setPriceFilter(newPriceFilter);
  };

  const handlePriceChangeManual = (index, value) => {
    const newPriceFilter = [...priceFilter];
    newPriceFilter[index] = Number(value);
    setPriceFilter(newPriceFilter);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategoryList = () => {
    setIsCategoryListOpen(!isCategoryListOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Header onSearch={handleDebouncedSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <button className="menu-icon" onClick={toggleMenu}>
                <FaBars />
              </button>
              {isMenuOpen && (
                <div className="menu-popup">
                  <button className="close-icon" onClick={closeMenu}>
                    <FaTimes />
                  </button>
                  <div className="filters">
                    <div className="filter-section">
                      <h3 onClick={toggleCategoryList} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        Kategoriler
                        {isCategoryListOpen ? <FaChevronUp style={{ marginLeft: '8px' }} /> : <FaChevronDown style={{ marginLeft: '8px' }} />}
                      </h3>
                      {isCategoryListOpen && (
                        <select onChange={handleCategoryChange} value={categoryFilter} size="5">
                          <option value="">All Categories</option>
                          {Array.from(new Set(products.map(product => product.category))).map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="filter-section">
                      <h3>Fiyat Aralığı</h3>
                      <div className="price-range-inputs">
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          value={priceFilter[0]}
                          onChange={(e) => handlePriceChangeManual(0, e.target.value)}
                        />
                        <span> - </span>
                        <input
                          type="number"
                          min="0"
                          max="1000"
                          value={priceFilter[1]}
                          onChange={(e) => handlePriceChangeManual(1, e.target.value)}
                        />
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        step="10"
                        value={priceFilter[0]}
                        onChange={(e) => handlePriceChange(e)}
                      />
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        step="10"
                        value={priceFilter[1]}
                        onChange={(e) => handlePriceChangeManual(1, e.target.value)}
                      />
                    </div>

                    <div className="filter-section">
                      <h3>Sıralama</h3>
                      <select onChange={handleSortChange} value={sortOrder}>
                        <option value="asc">Sort by Price (Low to High)</option>
                        <option value="desc">Sort by Price (High to Low)</option>
                      </select>
                    </div>
                    
                    <div className="filter-section">
                      <h3>Arama</h3>
                      <input type="text" placeholder="Ara..." onChange={(e) => handleDebouncedSearch(e.target.value)} />
                    </div>
                  </div>
                </div>
              )}
              <div className="product-list">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
