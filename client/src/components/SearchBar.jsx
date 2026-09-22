import React from 'react';

function SearchBar({searchTerm, setSearchTerm, placeholder }) {
    return (
        <input 
            type="text"
            placeholder={placeholder || "🔍 Search..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '15px', boxSizing: 'border-box' }} />
    )
}

export default SearchBar;