import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ItemService from './ItemService';

class TableRow extends Component {

    constructor(props){
        super(props);
        this.addItemService = new ItemService();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var del = window.confirm("Are you sure you want to delete this ride?");
        if(del){
            this.addItemService.deleteData(this.props.obj._id);
            window.location.reload();

        }
    }

    render(){
        console.log(this.props.obj.received);
        return(
                <tr>
                    <td>11:00 PM</td>
                    <td>{this.props.obj.name}</td>
                    <td>{this.props.obj.banner}</td>
                    <td>{this.props.obj.phone}</td>
                    <td><a href={"mailto:"+ this.props.obj.email}>{this.props.obj.email}</a></td>
                    <td>{this.props.obj.pickup}</td>
                    <td>{this.props.obj.dropoff}</td>
                    <td>001</td>
                    <td>
                        <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
                    </td>
                    <td>
						<form onSubmit={this.handleSubmit}>
                        	<input type="submit" value="Delete" className="btn btn-danger" />
						</form>
                    </td>
                 </tr>
        );
    }
}

export default TableRow;
