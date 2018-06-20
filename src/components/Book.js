import React, {Component} from 'react';
import '../css/Book.css';
import PropTypes from 'prop-types';
import axios from 'axios';

class Book extends Component {
	constructor(props) {
		super(props);
		this.handleSave = this.handleSave.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.updateSearch = this.updateSearch.bind(this);
		this.search = this.search.bind(this);
	}

	componentWillMount() {
		this.state = {
			isbn: this.props.isbn,
			title: this.props.title,
			author: this.props.author,
			publisher: this.props.publisher,
			datePublished: this.props.datePublished,
			id: this.props.id,
			editMode: false
		}
	}

	handleEdit() {
		this.setState({
			editMode: true
		})
	}

	handleSave() {
		this.props.firebaseDBRef.child(this.props.id).set({
      		isbn: this.refs.isbnContent.value,
			title: this.refs.titleContent.value,
			author: this.refs.authorContent.value,
			publisher: this.refs.publisherContent.value,
			datePublished: this.refs.datePublishedContent.value
    	});
		this.setState({
			isbn: this.refs.isbnContent.value,
			title: this.refs.titleContent.value,
			author: this.refs.authorContent.value,
			publisher: this.refs.publisherContent.value,
			datePublished: this.refs.datePublishedContent.value,
			editMode: false
		});
	}

	handleDelete() {
		this.props.deleteHandler(this.props.id);
	}

	search(query) {
		let googleTitle, googleAuthor, googlePublisher, googleDatePublished, entryId;
		entryId = this.state.id;		
	
		axios.get('https://www.googleapis.com/books/v1/volumes?q=' + query)
			.then(res => {		

			googleTitle = res.data.items[0].volumeInfo.title;
			googleAuthor = res.data.items[0].volumeInfo.authors;
			googlePublisher = res.data.items[0].volumeInfo.publisher;
			googleDatePublished = res.data.items[0].volumeInfo.publishedDate;	

			googleTitle === undefined ? googleTitle = '': googleTitle;
			googleAuthor === undefined ? googleAuthor = '': googleAuthor;
			googlePublisher === undefined ? googlePublisher = '': googlePublisher;
			googleDatePublished === undefined ? googleDatePublished = '': googleDatePublished;	

			document.getElementsByClassName(`${entryId} title-input`)[0].value = googleTitle;
			document.getElementsByClassName(`${entryId} author-input`)[0].value = googleAuthor;
			document.getElementsByClassName(`${entryId} publisher-input`)[0].value = googlePublisher;
			document.getElementsByClassName(`${entryId} datePublished-input`)[0].value = googleDatePublished;
		});
	}		

	updateSearch() {
		this.search(this.refs.isbnContent.value);

	}

	render() {
		let isbnElement,titleElement,authorElement,publisherElement,datePublishedElement,defaultElement,buttonArea,otherEntries;
		
		if (this.state.editMode) {
			defaultElement = <div><h5>Book information</h5></div>
			isbnElement = <div><input ref="isbnContent" className={'form-control isbn-input ' + this.state.id} defaultValue={this.state.isbn} placeholder='ISBN'></input><button className='btn isbn-input' onClick={this.updateSearch}>Search by ISBN</button> </div>
			titleElement = <input ref='titleContent' className={'form-control title-input non-isbn-input ' + this.state.id} defaultValue={this.state.title} placeholder="Title"></input>
			authorElement = <input ref='authorContent' className={'form-control author-input non-isbn-input ' + this.state.id} defaultValue={this.state.author} placeholder="Author"></input>
			publisherElement = <input ref='publisherContent' className={'form-control publisher-input non-isbn-input ' + this.state.id} defaultValue={this.state.publisher} placeholder="Publisher"></input>
			datePublishedElement = <input ref='datePublishedContent' className={'form-control datePublished-input non-isbn-input ' + this.state.id} defaultValue={this.state.datePublished} placeholder="Year Published"></input>
			buttonArea = <li className='button-area'><button className="btn btn-primary" onClick={this.handleSave}>Save</button></li>;

		} else {
			if (this.state.isbn === '' && this.state.title === '' && this.state.author === '' && this.state.publisher === '' && this.state.datePublished === '') {
				defaultElement = (<div><h5>There's nothing here!</h5> 
					<p>Click edit to start adding information.</p></div>);				
			} else {
				defaultElement = ''
				isbnElement = ''
				titleElement = <li><h5>{this.state.title}</h5></li>;
				authorElement = <li>{this.state.author}</li>;
				publisherElement = <li>{this.state.publisher}</li>;
				datePublishedElement = <li>{this.state.datePublished}</li>;		
			}
			buttonArea = <div className='button-area'><button className="btn btn-info" onClick={this.handleEdit}>Edit</button><button className="btn btn-danger" onClick={this.handleDelete}>Delete</button></div>
		}

		return(
			<div className="col-sm-6 column">
				<div className="card card-view">
					<div className="card-body">
						<ul>
							{defaultElement}
							{isbnElement}
							{titleElement}
							{authorElement}
							{publisherElement}
							{datePublishedElement}
							{buttonArea}
						</ul>
					</div>
				</div>
			</div>	
		);
	}
}

Book.propTypes = {
	title: PropTypes.string,
	author: PropTypes.string,
	publisher: PropTypes.string,
	datePublished: PropTypes.string
}

Book.defaultProps = {

}

export default Book;