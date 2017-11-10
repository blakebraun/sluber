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
              <div className="container">
                <table className="table table=striped">
                    <thead>
                        <tr>
                            <td>Item</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.tabRow()}
                    </tbody>
                </table>
				<div align="center">
						<Link to={"/add-item"} className="btn btn-primary">Add Item</Link>
				</div>
              </div>
        );
    }
}

export default IndexItem;

