import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ItemService from './ItemService';

class TableRow extends Component {

    constructor(props){
        super(props);
        this.addItemService = new ItemService();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.formatTime = this.formatTime.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        var del = window.confirm("Are you sure you want to delete this ride?");
        if(del){
            this.addItemService.deleteData(this.props.obj._id);
            window.location.reload();

        }
    }

    formatTime(){
        let received = new Date(this.props.obj.received);
        let hours = received.getHours();
        let minutes = received.getMinutes();
        let m;

        if(hours>11) {
            m = "PM";
        }
        else{
            m = "AM";
        }

        if(hours>12) {
            hours = hours - 12;
        }

        if(minutes<10){
            minutes = "0" + minutes.toString();
        }

        return(<td>{hours +":"+minutes + " " + m}</td>);
    }

    render(){
        return(
                <tr>
                    {this.formatTime()}
                    <td>{this.props.obj.name}</td>
                    <td>{this.props.obj.banner}</td>
                    <td>{this.props.obj.phone}</td>
                    <td><a href={"mailto:"+ this.props.obj.email}>{this.props.obj.email}</a></td>
                    <td>{this.props.obj.pickup}</td>
                    <td>{this.props.obj.dropoff}</td>
                    <td>{this.props.obj.dispatched}</td>
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
