import React, {Component} from 'react';
import ItemService from './ItemService';
import axios from 'axios';
import TableRow from './TableRow';
import {Link} from 'react-router-dom';

class IndexItem extends Component {

    constructor(props) {
        super(props);
        this.state = {value:'', items:''};
        this.addItemService = new ItemService();
    }

    componentDidMount(){
        axios.get('http://localhost:4200/items')
            .then(response=>{
                this.setState({items:response.data});
            })
            .catch(function(error){
                console.log(error);
            })
    }
    tabRow(){
        if(this.state.items instanceof Array){
            return this.state.items.map(function(object, i){
                return <TableRow obj={object} key={i}/>;
            })
        }
    }

    render() {
       return(
           <div>
            <img src="/img/dispatcher.png" alt="SLUber Dispatcher Console" height="100px" />
               <Link to={"/add-item"} className="add-button" style={{color: 'white', textDecoration:'none'}}>Add Ride</Link>
               <hr />
               <div className="container">
                <table className="table table=striped">
                    <thead>
                        <tr>
                            <td>Time Received</td>
                            <td>Name</td>
                            <td>Banner</td>
                            <td>Phone Number</td>
                            <td>Email</td>
                            <td>Start Location</td>
                            <td>End Location</td>
                            <td>Unit Dispatched</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
              </div>
           </div>
        );
    }
}

export default IndexItem;

