import React, { Component } from "react";
import Button from "./Button";

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
                                <Button onClick={() => onDismiss(item.id)}>
                                    Dismiss
                                </Button>
                            </span>
                        </div>
                    )
                })}
          </div>    
        )
    }
}

export default Table