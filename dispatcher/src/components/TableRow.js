import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RideService from './RideService';
let locations = require('../locations');

class TableRow extends Component {

    constructor(props){
        super(props);
        this.addRideService = new RideService();
        this.handleDelete = this.handleDelete.bind(this);
        this.formatTime = this.formatTime.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.populateLocations = this.populateLocations.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.state = {
            name: this.props.obj.name,
            banner: this.props.obj.banner,
            phone: this.props.obj.phone,
            email: this.props.obj.email,
            pickup: this.props.obj.pickup,
            dropoff: this.props.obj.dropoff,
            dispatched: this.props.obj.dispatched,
            edit: false
        };
    }

    handleDelete(event) {
        event.preventDefault();
        let del = window.confirm("Are you sure you want to delete this ride?");
        if(del){
            this.addRideService.deleteData(this.props.obj._id);
            window.location.reload();

        }
    }

    formatTime(){
        let received = new Date(this.props.obj.received);
        let month = received.getMonth() + 1;
        let day = received.getDate();
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

        return(<td className="rides-table-cell">{month + "/" + day + " " + hours + ":" + minutes + " " + m}</td>);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    populateLocations() {
        return locations.map(function(location, i){
            return <option value={location} key={i}>{location}</option>;
        })
    }

    toggleEdit() {
        if(this.state.edit){
            this.setState({
                name: this.props.obj.name,
                banner: this.props.obj.banner,
                phone: this.props.obj.phone,
                email: this.props.obj.email,
                pickup: this.props.obj.pickup,
                dropoff: this.props.obj.dropoff,
                dispatched: this.props.obj.dispatched,
            })
        }
        this.setState({edit: !this.state.edit});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validateForm()) {
            this.addRideService.updateData(this.state, this.props.obj._id);
            this.toggleEdit();
            window.location.reload();
        }
    }

    validateForm() {
        let bannerPattern = new RegExp("00[0-9]{7}");
        let phonePattern = new RegExp("[0-9]{10}");
        let emailPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
        let dispatchedPattern = new RegExp("[0-9]{3}");

        if(!bannerPattern.test(this.state.banner)){
            alert("Please enter a valid banner ID.");
            return false;
        }
        else if(!phonePattern.test(this.state.phone)){
            alert("Please enter a valid ten digit phone number.");
            return false;
        }
        else if(!emailPattern.test(this.state.email)){
            alert("Please enter a valid email address.");
            return false;
        }
        else if(this.state.pickup === this.state.dropoff){
            alert("Pickup and dropoff locations may not be the same.");
            return false;
        }
        else{
            return true;
        }
    }

    render(){
        if(!this.state.edit) {
            return (
                <tr className>
                    {this.formatTime()}
                    <td className="rides-table-cell">{this.props.obj.name}</td>
                    <td className="rides-table-cell">{this.props.obj.banner}</td>
                    <td className="rides-table-cell">{this.props.obj.phone}</td>
                    <td className="rides-table-cell"><a href={"mailto:" + this.props.obj.email}>{this.props.obj.email}</a></td>
                    <td className="rides-table-cell">{this.props.obj.pickup}</td>
                    <td className="rides-table-cell">{this.props.obj.dropoff}</td>
                    <td className="rides-table-cell">{this.props.obj.dispatched}</td>
                    <td>
                        {/*<Link to={"/edit/" + this.props.obj._id} className="btn btn-primary">Edit</Link>*/}
                        <button onClick={this.toggleEdit} className="btn btn-primary">Edit</button>
                    </td>
                    <td>
                        <form onSubmit={this.handleDelete}>
                            <input type="submit" value="Delete" className="btn btn-danger"/>
                        </form>
                    </td>
                </tr>
            );
        }
        else{
            return(
                <tr>
                    {this.formatTime()}
                    <td className="rides-table-edit-cell"><input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} className="form-control" /></td>
                    <td className="rides-table-edit-cell"><input name="banner" type="text" value={this.state.banner} onChange={this.handleInputChange} className="form-control" /></td>
                    <td className="rides-table-edit-cell"><input name="phone" type="text" value={this.state.phone} onChange={this.handleInputChange} className="form-control" /></td>
                    <td className="rides-table-edit-cell"><input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} className="form-control" /></td>
                    <td className="rides-table-edit-cell"><select name="pickup" value={this.state.pickup} onChange={this.handleInputChange} className="form-control">
                        {this.populateLocations()}
                    </select></td>
                    <td className="rides-table-edit-cell"><select name="dropoff" value={this.state.dropoff} onChange={this.handleInputChange} className="form-control">
                        {this.populateLocations()}
                    </select></td>
                    <td className="rides-table-edit-cell"><select name="dispatched" value={this.state.dispatched} onChange={this.handleInputChange} className="form-control">
                        <option></option>
                        <option value="815">815</option>
                        <option value="816">816</option>
                        <option value="817">817</option>
                        <option value="800">800</option>
                    </select></td>
                    <td><button onClick={this.handleSubmit} className="btn btn-primary">Update</button></td>
                    <td>
                        <button onClick={this.toggleEdit} className="btn btn-primary">Cancel</button>
                    </td>
                </tr>
            )
        }
    }
}

export default TableRow;
