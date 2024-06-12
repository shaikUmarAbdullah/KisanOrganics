import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './SearchComponent.css';
import { ShopContext } from '../Context/ShopContext';

const SearchComponent = () => {
  const { products } = useContext(ShopContext);
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef(null);

  const handleSearch = (query) => {
    setQuery(query);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setIsSearching(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setIsSearching(false);
        setQuery('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      setQuery('');
    };
  }, []);

  const handleItemClick = () => {
    setIsSearching(false);
    setQuery('');
  };

  return (
    <div ref={searchContainerRef} className="search-container">
      <SearchBar onSearch={handleSearch} query={query} />
      {isSearching && (
        <div className="search-results">
          {filteredProducts.map(product => (
            <div key={product.id} className="search-item" onClick={handleItemClick}>
              <Link to={`/product/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
