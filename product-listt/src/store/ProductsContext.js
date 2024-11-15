import React, { createContext, useContext, useState } from 'react';

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: '', priceRange: [0, 1000] });

  return (
    <ProductsContext.Provider value={{ products, setProducts, filters, setFilters }}>
      {children}
    </ProductsContext.Provider>
  );
};
