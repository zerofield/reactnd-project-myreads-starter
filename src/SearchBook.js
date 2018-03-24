import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookItem from './BookItem';
import PropTypes from 'prop-types';

class SearchBook extends Component {

  static propTypes = {
    bookshelfLevels: PropTypes.array.isRequired,
    moveBookToLevel: PropTypes.func.isRequired
  }

  state = {
    keyword: '',
    books: []
  }

  search(keyword) {
    if (keyword) {
      console.log(`search for ${keyword}`);
      //首先清空数组
      this.setState({books:[]});
      BooksAPI.search(keyword)
        .then((books) => {

          const newBooks = [];

          if (books && books instanceof Array) {
            books.forEach(book => {
              newBooks.push(book);
            });
          }

          this.setState({books: newBooks});
        }).catch(console.log);

    }
  }

	render() {
		return (
			<div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" 
              		to="/"
              >Close</Link>
              <div className="search-books-input-wrapper">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  this.search(this.state.keyword);
                }}>
                  <input type="text" placeholder="Search by title or author" onChange={(e) => this.setState({keyword: e.target.value})}/>
                </form>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.books.map((book, index) => {
                    return (<BookItem key={index} book={book} bookshelfLevels={this.props.bookshelfLevels} moveBookToLevel={this.props.moveBookToLevel} />);
                  })
                }
              </ol>
            </div>
          </div>
		);
	}

}

export default SearchBook;