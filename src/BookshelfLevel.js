import React, {Component} from 'react';
import BookItem from './BookItem';
import PropTypes from 'prop-types';

class BookshelfLevel extends Component {

	static propTypes = {
		moveBookToLevel: PropTypes.func.isRequired,
		bookGroup: PropTypes.object.isRequired,
		bookshelfLevels: PropTypes.array.isRequired
	}

	render() {
		const group = this.props.bookGroup;
		const title = group.title;
		const books = group.books;

		return (
			<div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    	{books.map((book, index) => {
                    		return (<BookItem key={index} book={book} bookshelfLevels={this.props.bookshelfLevels} moveBookToLevel={this.props.moveBookToLevel} />);	
                    	})}
                    </ol>
                  </div>
            </div>
		);
	}

}

export default BookshelfLevel;