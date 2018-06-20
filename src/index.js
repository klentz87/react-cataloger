import React from 'react';
import ReactDOM from 'react-dom';
import Bookcase from './components/Bookcase'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Bookcase />, document.getElementById('root'));
registerServiceWorker();
