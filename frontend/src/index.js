import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import AddItem from './components/AddItem';
import IndexItem from './components/IndexItem';
import EditItem from './components/EditItem';

ReactDOM.render(
        <Router>
            <div>
                <Route exact path='/' component={IndexItem} />
                <Route path = '/add-item' component={AddItem} />
                <Route path='/index' component={IndexItem}/>
                <Route path='/edit/:id' component={EditItem}/>
            </div>
        </Router>,
        document.getElementById('root')
);
