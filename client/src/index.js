import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';

import AddRide from './components/AddRide';
import IndexItem from './components/IndexItem';
import EditRide from './components/EditRide';
import Complete from './components/Complete';

ReactDOM.render(
        <Router>
            <div>
                <Route exact path='/' component={IndexItem} />
                <Route path = '/add-ride' component={AddRide} />
                <Route path='/index' component={IndexItem}/>
                <Route path='/edit/:id' component={EditRide}/>
                <Route path='/complete/' component={Complete}/>
            </div>
        </Router>,
        document.getElementById('root')
);