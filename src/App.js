import React, { Component } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Table from './components/Table';
import Button from './components/Button';
import {DEFAULT_QUERY, DEFAULT_HPP, PATH_BASE, PATH_SEARCH, PARAM_SEARCH, PARAM_PAGE, PARAM_HPP} from './constants/constants'
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
      searchKey: '',
      searchTerm: DEFAULT_QUERY
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.isSearched = this.isSearched.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.needsToSearch = this.needsToSearch.bind(this);
  }

  onDismiss(id) {
    const {searchKey, result} = this.state;
    const {hits, page} = result[searchKey]

    const filterID = item => item.objectID !== id;
    const updatedList = hits.filter(filterID);

    this.setState({
      result: {...result, [searchKey]: {hits: updatedList, page}}
    })
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value})
  }

  isSearched(term) {
    return (item) => item.title.toLowerCase().includes(term.toLowerCase())
  }

  setSearchTopStories(results) {
    const {hits, page} = results
    const {searchKey, result} = this.state
    const oldHits = result && result[searchKey] ? result[searchKey].hits : []
    const updatedHits = [...oldHits, ...hits]

    this.setState({
      result: {
        ...result, 
        [searchKey]: {hits: updatedHits, page}
      }
    })
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    console.log(PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + searchTerm + '&' + PARAM_PAGE + page + '&' + PARAM_HPP + DEFAULT_HPP)
    axios.get(PATH_BASE + PATH_SEARCH + '?' + PARAM_SEARCH + searchTerm + '&' + PARAM_PAGE + page + '&' + PARAM_HPP + DEFAULT_HPP)
      .then(result => this.setSearchTopStories(result.data))
      .catch(err => console.log(err))
  }

  needsToSearch(searchTerm) {
    return !this.state.result[searchTerm]
  }

  onSearchSubmit(event) {
    event.preventDefault()
    this.setState({searchKey: this.state.searchTerm})

    if (this.needsToSearch(this.state.searchTerm)) {
      this.fetchSearchTopStories(this.state.searchTerm)
    }
  }

  componentDidMount() {
    this.setState({searchKey: this.state.searchTerm})
    this.fetchSearchTopStories(this.state.searchTerm)
  }

  render() {
    const {searchTerm, result, searchKey} = this.state
    const page = result && result[searchKey] ? result[searchKey].page : 0;
    const list = result && result[searchKey] ? result[searchKey].hits : [];

    return (
      <div className="App">
        <Search
          searchTerm={searchTerm}
          onSearchChange={this.onSearchChange}
          onSearchSubmit={this.onSearchSubmit}
        />
        {!result ? 
          <div>Loading...</div> :
          <Table
            list={list}
            onDismiss={this.onDismiss}
          />
        }
        <div className='interactions'>
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
