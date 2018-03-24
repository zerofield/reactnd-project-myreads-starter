import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import SearchBook from './SearchBook';
import Bookshelf from './Bookshelf';
import BookGroup from './BookGroup';
 

class BooksApp extends React.Component {

  state = {
    bookshelfLevels: [
      new BookGroup('Currently Reading', 'currentlyReading'),
      new BookGroup('Want to Read', 'wantToRead'),
      new BookGroup('Read', 'read')
    ]
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks() {
    BooksAPI.getAll()
      .then(books => {
        const newShelfLevels = [
          new BookGroup('Currently Reading', 'currentlyReading'),
          new BookGroup('Want to Read', 'wantToRead'),
          new BookGroup('Read', 'read')
        ];

        books.forEach(book => {
          for(const group of newShelfLevels) {
            if(group.shelf === book.shelf) {
              group.books.push(book);
              break;
            }
          }
        });

        this.setState({bookshelfLevels: newShelfLevels});
      }); 
  }

  moveBookToLevel = (book, newShelfLevel) => {

    this.setState(prevState => {
      const newShelfLevels = prevState.bookshelfLevels.map(shelfLevel => {
        let books;
        if (newShelfLevel === shelfLevel.shelf) {
          books = shelfLevel.books.concat([book]);
        } else {
          books = shelfLevel.books.filter(bookItem => bookItem.id !== book.id);
        }

        return new BookGroup(shelfLevel.title, shelfLevel.shelf, books);
      });

      return {bookshelfLevels: newShelfLevels};
    });

    BooksAPI.update(book, newShelfLevel)
      .then(json => {
         console.log(json);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <Bookshelf bookshelfLevels={this.state.bookshelfLevels} moveBookToLevel={this.moveBookToLevel}/>
          )} />
        <Route path="/search" render={() => (
            <SearchBook bookshelfLevels={this.state.bookshelfLevels} moveBookToLevel={this.moveBookToLevel}/>
          )} />
      </div>
    )
  }
}

export default BooksApp
