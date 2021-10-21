import React, { Component } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Table from './components/Table';
import {DEFAULT_QUERY, PATH_BASE, PATH_SEARCH, PARAM_SEARCH} from './constants/constants'
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
      result: null,
      searchTerm: DEFAULT_QUERY
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.isSearched = this.isSearched.bind(this)
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
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

  setSearchTopStories(result) {
    this.setState({result})
  }

  componentDidMount() {
    axios.get(PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + this.state.searchTerm)
      .then(result => this.setSearchTopStories(result.data))
      .catch(err => err)
  }

  render() {
    const {searchTerm, result} = this.state

    return (
      <div className="App">
        <Search
          searchTerm={searchTerm}
          onSearchChange={this.onSearchChange}
        />
        {!result ? 
          <div>Loading...</div> :
          <Table
            list={result.hits}
            searchTerm={searchTerm}
            onDismiss={this.onDismiss}
            isSearched={this.isSearched}
          />
        }
      </div>
    );
  }
}

export default App;
