import React, { Component } from 'react'
import './App.css';

// function isSearched(searchTerm) {
//   return (item) => {
//     return item.title.toLowerCase().includes(searchTerm.toLowerCase())
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: list,
      searchTerm: ''
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.isSearched = this.isSearched.bind(this)
  }

  onDismiss(id) {
    const filterID = item => item.id !== id;
    const updatedList = this.state.list.filter(filterID);
    this.setState({list: updatedList})
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  isSearched(term) {
    return (item) => item.title.toLowerCase().includes(term.toLowerCase())
  }

  render() {
    const {searchTerm, list} = this.state

    return (
      <div className="App">
        <form>
          <input 
            type='text'
            value={searchTerm}
            onChange={this.onSearchChange}
          />
        </form>
        {list.filter(this.isSearched(searchTerm)).map(item => {
          return (
            <div key={item.id}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span> {item.author}</span>
              <span> {item.num_comments}</span>
              <span> {item.points} </span>
              <span>
                <button onClick={() => this.onDismiss(item.id)} type='button'>
                  Dismiss
                </button>
              </span>
            </div>
          )
        })}
      </div>
    );
  }
}

const list = [
  {
    title: 'React',
    url: 'https://reactjs.org',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    id: 0
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org',
    author: 'Dan',
    num_comments: 2,
    points: 5,
    id: 1
  }
]

export default App;
