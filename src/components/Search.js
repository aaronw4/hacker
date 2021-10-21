import React from "react";

function Search(props) {
    const {searchTerm, onSearchChange} = props;

    return (
        <form>
            Search
            <input 
                type='text'
                value={searchTerm}
                onChange={onSearchChange}
            />
        </form>
    )
}

export default Search