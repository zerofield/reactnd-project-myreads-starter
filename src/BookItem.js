import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BookItem extends Component {

	static propTypes = {
		bookshelfLevels: PropTypes.array.isRequired,
		book: PropTypes.object.isRequired,
		moveBookToLevel: PropTypes.func.isRequired
	}

	render() {
		const book = this.props.book;
		const imageUrl = book.imageLinks ? book.imageLinks.thumbnail : './icons/default_book_img.png';


		let authors = '';
		if(book.auhtors) {
			authors = book.auhtors.join(',');
		}

		//设置被选中的书架
	 	let selectValue = 'none';
	 	for (const shelfLevels of this.props.bookshelfLevels) {
	 		for (const bookOnShelf of shelfLevels.books) {
	 			if (book.id === bookOnShelf.id) {
	 				selectValue = shelfLevels.shelf;
	 				break;
	 			}
	 		}
	 	}

		return (
			<li>
	            <div className="book">
	              <div className="book-top">
	                <div className="book-cover" style={
	                	{ 
	                		width: 128, 
	                		height: 193, 
	                		backgroundImage: `url(${imageUrl})` 
	                	}
	                }></div>


	                <div className="book-shelf-changer">
	                  <select
	                  	value={selectValue}
	                    onChange={(e)=>{
	                  		this.props.moveBookToLevel(book, e.target.value);
	                  }}>
	                    <option value="none" disabled>Move to...</option>
	                    <option value="currentlyReading">Currently Reading</option>
	                    <option value="wantToRead">Want to Read</option>
	                    <option value="read">Read</option>
	                    <option value="none">None</option>
	                  </select>
	                </div>
	              </div>
	              <div className="book-title">{book.title}</div>
	              <div className="book-authors">{authors}</div>
	            </div>
	          </li>
		);
	}

}

export default BookItem;
