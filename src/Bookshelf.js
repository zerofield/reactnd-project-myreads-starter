import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import BookshelfLevel from './BookshelfLevel';
import PropTypes from 'prop-types';


class Bookshelf extends Component {

  static propTypes = {
    bookshelfLevels: PropTypes.array.isRequired,
    moveBookToLevel:PropTypes.func.isRequired,
  }

	render() {

    const bookshelfLevels = this.props.bookshelfLevels;

		return (
			<div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {bookshelfLevels.map((bookGroup, index) => {
                    return (
                      <BookshelfLevel key={index} bookGroup={bookGroup} bookshelfLevels={bookshelfLevels} moveBookToLevel={this.props.moveBookToLevel}/> 
                    );
                  })}
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
		);
	}
}

export default Bookshelf;