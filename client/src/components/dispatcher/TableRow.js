import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RideService from './RideService';
import Modal from 'react-modal';
let locations = require('../../locations');

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
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.dispatchRide = this.dispatchRide.bind(this);
        this.sendUpdate = this.sendUpdate.bind(this);

        this.state = {
            name: this.props.obj.name,
            riders: this.props.obj.riders,
            banner: this.props.obj.banner,
            phone: this.props.obj.phone,
            email: this.props.obj.email,
            pickupLoc: this.props.obj.pickupLoc,
            dropoffLoc: this.props.obj.dropoffLoc,
            pickupTime: this.props.obj.pickupTime,
            dropoffTime: this.props.obj.dropoffTime,
            dispatched: this.props.obj.dispatched,
            status: this.props.obj.status,
            edit: false,
            modalIsOpen: false
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

        return(<div>{month + "/" + day + " " + hours + ":" + minutes + " " + m}</div>);
    }

    handleInputChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    populateLocations() {
        return locations.map(function(location, i){
            if(location[0] === "Frost Campus" || location[0] === "Medical Campus" || location[0] === "Off Campus" || location[0] === "Intersections"){
                return <option value={location[0]} key={i} disabled>{location[0]}</option>;
            }
            else{
                return <option value={location[0]} key={i}>{location[0]}</option>;
            }
        })
    }

    toggleEdit() {
        if(this.state.edit){
            this.setState({
                name: this.props.obj.name,
                banner: this.props.obj.banner,
                phone: this.props.obj.phone,
                email: this.props.obj.email,
                pickupLoc: this.props.obj.pickupLoc,
                dropoffLoc: this.props.obj.dropoffLoc,
                pickupTime: this.props.obj.pickupTime,
                dropoffTime: this.props.obj.dropoffTime,
                dispatched: this.props.obj.dispatched,
                riders: this.props.obj.riders,
                status: this.props.obj.status
            })
        }
        this.setState({edit: !this.state.edit});
    }

    sendUpdate(){
        this.addRideService.updateData(this.state, this.props.obj._id);
        window.location.reload();
    }

    dispatchRide(){
        let now = new Date;
        let hours = now.getHours();
        let minutes = now.getMinutes();
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

        let time = hours + ":" + minutes + " " + m;
        this.setState({status: "Dispatched", pickupTime: time}, this.sendUpdate);
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
        else if(this.state.pickupLoc === this.state.dropoffLoc){
            alert("Pickup and dropoff locations may not be the same.");
            return false;
        }
        else{
            return true;
        }
    }

    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal(){
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    toggleModal(){
        this.setState({modalIsOpen: !this.state.modalIsOpen});
    }

    render(){
        if(!this.state.edit) {
            return (
                <tr className>
                    <td className="rides-table-cell">{this.props.obj.status}</td>
                    <td className="rides-table-cell">{this.formatTime()}</td>
                    <td className="rides-table-cell">{this.props.obj.name}</td>
                    <td className="rides-table-cell">{this.props.obj.riders}</td>
                    <td className="rides-table-cell">{this.props.obj.pickupLoc}</td>
                    <td className="rides-table-cell">{this.props.obj.dropoffLoc}</td>
                    <td className="rides-table-cell">{this.props.obj.pickupTime}</td>
                    <td className="rides-table-cell">{this.props.obj.dropoffTime}</td>
                    <td className="rides-table-cell">{this.props.obj.dispatched}</td>
                    <div className="dropdown">
                        <button className="dropbtn">Ride Actions</button>
                        <div className="dropdown-content">
                            <button onClick={this.toggleEdit} className="dropdown-button">Edit</button>
                            <button onClick={this.dispatchRide} className="dropdown-button">Dispatch</button>
                            <button className="dropdown-button">Complete</button>
                            <button onClick={this.toggleModal} className="dropdown-button">View Details</button>
                            <button onClick={this.handleDelete} className="dropdown-button" style={{backgroundColor: "#ff0019", color:"white"}}>Delete</button>
                        </div>
                    </div>
                    <div>
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onAfterOpen={this.afterOpenModal}
                            onRequestClose={this.closeModal}
                            contentLabel="Details"
                            className={{
                                base: 'modal-content'
                            }}
                            overlayClassName={{
                                base: 'modal-overlay'
                            }}
                        >
                            <div className="details-table">
                                <table>
                                    <tr>
                                        <td className="details-table-cell"><b>Status:</b></td>
                                        <td className="details-table-cell">{this.props.obj.status}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Time Received:</b></td>
                                        <td className="details-table-cell">{this.formatTime()}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Name:</b></td>
                                        <td className="details-table-cell">{this.props.obj.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Banner ID:</b></td>
                                        <td className="details-table-cell">{this.props.obj.banner}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Phone Number:</b></td>
                                        <td className="details-table-cell">{this.props.obj.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Email Address:</b></td>
                                        <td className="details-table-cell"><a href={"mailto:" + this.props.obj.email}>{this.props.obj.email}</a></td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Number of Riders:</b></td>
                                        <td className="details-table-cell">{this.props.obj.riders}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Pickup Location:</b></td>
                                        <td className="details-table-cell">{this.props.obj.pickupLoc}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Dropoff Location:</b></td>
                                        <td className="details-table-cell">{this.props.obj.dropoffLoc}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Pickup Time:</b></td>
                                        <td className="details-table-cell">{this.props.obj.pickupTime}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Dropoff Time:</b></td>
                                        <td className="details-table-cell">{this.props.obj.dropoffTime}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Unit Dispatched:</b></td>
                                        <td className="details-table-cell">{this.props.obj.dispatched}</td>
                                    </tr>
                                </table>
                                <button onClick={this.toggleModal} className="close-button" style={{color: 'white', textDecoration:'none'}}>Close</button>
                                <button onClick={this.handleDelete} className="dispatcher-delete-button" style={{color: 'white', textDecoration:'none'}}>Delete Ride</button>
                            </div>
                        </Modal>
                    </div>
                </tr>
            );
        }
        else{
            return(
                <tr>
                    <td className="rides-table-cell">
                        <select name="status" value={this.state.status} onChange={this.handleInputChange} className="form-control" required>
                            <option value="Active">Active</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Complete">Complete</option>
                        </select>
                    </td>
                    <td className="rides-table-cell">{this.formatTime()}</td>
                    <td className="rides-table-edit-cell"><input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} className="form-control" required/></td>
                    <td className="rides-table-edit-cell">
                        <select name="riders" value={this.state.riders} onChange={this.handleInputChange} className="form-control" required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </td>
                    <td className="rides-table-edit-cell"><select name="pickupLoc" value={this.state.pickupLoc} onChange={this.handleInputChange} className="form-control" required>
                        {this.populateLocations()}
                    </select></td>
                    <td className="rides-table-edit-cell"><select name="dropoffLoc" value={this.state.dropoffLoc} onChange={this.handleInputChange} className="form-control" required>
                        {this.populateLocations()}
                    </select></td>
                    <td className="rides-table-edit-cell"><input name="pickupTime" type="text" value={this.state.pickupTime} onChange={this.handleInputChange} className="form-control" required /></td>
                    <td className="rides-table-edit-cell"><input name="dropoffTime" type="text" value={this.state.dropoffTime} onChange={this.handleInputChange} className="form-control" required /></td>
                    <td className="rides-table-edit-cell"><select name="dispatched" value={this.state.dispatched} onChange={this.handleInputChange} className="form-control" required>
                        <option></option>
                        <option value="815">815</option>
                        <option value="816">816</option>
                        <option value="817">817</option>
                        <option value="800">800</option>
                    </select></td>
                    <td className="rides-table-edit-cell"><button onClick={this.handleSubmit} className="table-button">Update</button></td>
                    <td className="rides-table-edit-cell">
                        <button onClick={this.toggleEdit} className="table-button">Cancel</button>
                    </td>
                </tr>
            )
        }
    }
}

export default TableRow;
