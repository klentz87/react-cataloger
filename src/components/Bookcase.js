import React, {Component} from 'react';
import '../css/Bookcase.css';
import Bookshelf from './Bookshelf'

class Bookcase extends Component {
	
	render() {
		return(

			<div className='bookcase'>
				<div className='jumbotron'>
					<h1>Book Cataloger</h1>
				</div>

				<div className='container'>	
					<div className='div-row'>
						<Bookshelf />						
					</div>
				</div>
			</div>	
		)
	}
}

export default Bookcase;