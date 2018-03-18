import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import Bookshelf from './Bookshelf'
import {Route} from 'react-router-dom'


class BooksApp extends React.Component {

  state = {
     
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
            <SearchBook />
          )} />

        <Route exact path="/" render={() => (
            <Bookshelf />
          )} />
      </div>
    )
  }
}

export default BooksApp
