import React, { Component } from "react";

class Table extends Component {
    render() {
        const {list, searchTerm, onDismiss, isSearched} = this.props;

        return (
            <div>      
                {list.filter(isSearched(searchTerm)).map(item => {
                    return (
                        <div key={item.id}>
                            <span>
                            <a href={item.url}>{item.title}</a>
                            </span>
                            <span> {item.author}</span>
                            <span> {item.num_comments}</span>
                            <span> {item.points} </span>
                            <span>
                            <button onClick={() => onDismiss(item.id)} type='button'>
                                Dismiss
                            </button>
                            </span>
                        </div>
                    )
                })}
          </div>    
        )
    }
}

export default Table