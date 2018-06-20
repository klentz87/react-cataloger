import React, {Component} from 'react';
import '../css/Bookshelf.css';
import Book from './Book.js';
import PropTypes from 'prop-types';
import myFirebase from '../utility/MyFirebase';

const DEFAULT_MESSAGE = "Click edit to enter a book!"

class Bookshelf extends Component {
	constructor() {
		super();
		this.state = {
			books: [],
		}	
		this.deleteBook = this.deleteBook.bind(this);	

		this.firebaseDBRef = myFirebase.getFirebaseRef();
    	this.firebaseDBRef.once('value').then((snapshot) => {
      		this.addBook(snapshot.val());	
      	});	
	}

	addBook(books) {
	    if(books){
	    	for(let key in books){
	        	this.state.books.unshift(
	          		{
	            		id: key,
	            		defaultMessage: books[key].defaultMessage,
	            		isbn: books[key].isbn,
	            		title: books[key].title,
	            		author: books[key].author,
	            		publisher: books[key].publisher,
	            		datePublished: books[key].datePublished
	          		}
	        	);
	      	}
	    } else {
	    	let pushRef = this.firebaseDBRef.push();
	    	pushRef.set({
	    		defaultMessage: DEFAULT_MESSAGE,
	            isbn: '',
	            title: '',
	            author: '',
	            publisher: '',
	            datePublished: ''
      		});
	    	this.state.books.unshift(
	        	{
	          		id: pushRef.key,
	          		defaultMessage: DEFAULT_MESSAGE,
	          		isbn: '',
	            	title: '',
	            	author: '',
	            	publisher: '',
	            	datePublished: ''
	        	}
	      	);
	    }
	    this.setState(
	    	{	
	        	books: this.state.books
	    	}
	    );
	}

	deleteBook(id) {
		let newBookArr = this.state.books;
		newBookArr.map((book, index) => {
			if (id === book.id) {
				newBookArr.splice(index,1);
				this.firebaseDBRef.child(id).remove();
			}
		});
		this.setState(
			{
				books: newBookArr	
			}
		);
	}

	render() {

		return (
			<div className='container container-bookshelf'>
				<div className='div-bookshelf'>
					<button className='btn btn-success add-button' onClick={this.addBook.bind(this, null)}>Add a Book</button>
						<div>
							{
								this.state.books.map(book => {
									return <Book key={book.id} id={book.id} defaultMessage={book.defaultMessage} isbn={book.isbn} title={book.title} author={book.author} publisher={book.publisher} datePublished={book.datePublished} firebaseDBRef={this.firebaseDBRef} deleteHandler={this.deleteBook} />	
								})
							}
 						</div>
				</div>
				
			</div>
		);
	}
}


export default Bookshelf;

