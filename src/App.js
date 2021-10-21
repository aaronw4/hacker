import React, { Component } from 'react'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: list
    }
    this.onDismiss = this.onDismiss.bind(this)
  }

  onDismiss(id) {
    const filterID = item => item.id !== id;
    const updatedList = this.state.list.filter(filterID);
    this.setState({list: updatedList})
  }
  
  render() {
    return (
      <div className="App">
        {
          this.state.list.map(item => {
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
          })
        }
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
