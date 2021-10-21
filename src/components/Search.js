import React, { Component } from "react";

class Search extends Component {
    render() {
        const {searchTerm, onSearchChange} = this.props;

        return (
            <form>
                <input 
                    type='text'
                    value={searchTerm}
                    onChange={onSearchChange}
                />
            </form>
        )
    }
}

export default Search