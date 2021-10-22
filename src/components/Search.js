import React from "react";

function Search(props) {
    const {searchTerm, onSearchChange, onSearchSubmit} = props;

    return (
        <form onSubmit={onSearchSubmit}>
            Search
            <input 
                type='text'
                value={searchTerm}
                onChange={onSearchChange}
            />
            <button type='submit'>
                Search
            </button>
        </form>
    )
}

export default Search