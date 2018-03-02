import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RideService from './RideService';
import Modal from 'react-modal';
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
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.toggleModal = this.toggleModal.bind(this)

        this.state = {
            name: this.props.obj.name,
            riders: this.props.obj.riders,
            banner: this.props.obj.banner,
            phone: this.props.obj.phone,
            email: this.props.obj.email,
            pickup: this.props.obj.pickup,
            dropoff: this.props.obj.dropoff,
            dispatched: this.props.obj.dispatched,
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
            if(location === "Frost Campus" || location === "Medical Campus" || location === "Off Campus" || location === "Intersections"){
                return <option value={location} key={i} disabled>{location}</option>;
            }
            else{
                return <option value={location} key={i}>{location}</option>;
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
                pickup: this.props.obj.pickup,
                dropoff: this.props.obj.dropoff,
                dispatched: this.props.obj.dispatched,
                riders: this.props.obj.riders
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
                    <td className="rides-table-cell">{this.formatTime()}</td>
                    <td className="rides-table-cell">{this.props.obj.name}</td>
                    <td className="rides-table-cell">{this.props.obj.riders}</td>
                    <td className="rides-table-cell">{this.props.obj.pickup}</td>
                    <td className="rides-table-cell">{this.props.obj.dropoff}</td>
                    <td className="rides-table-cell">11:00 PM</td>
                    <td className="rides-table-cell">11:15 PM</td>
                    <td className="rides-table-cell">{this.props.obj.dispatched}</td>
                    <td className="rides-table-cell">
                        <button onClick={this.toggleEdit} className="table-button">Edit</button>
                    </td>
                    <div>
                        <td className="rides-table-cell">
                        <button onClick={this.toggleModal} className="table-button" style={{color: 'white', textDecoration:'none'}}>Details</button>
                        </td>
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
                                        <td className="details-table-cell">{this.props.obj.pickup}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Dropoff Location:</b></td>
                                        <td className="details-table-cell">{this.props.obj.dropoff}</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Pickup Time:</b></td>
                                        <td className="details-table-cell">11:00 PM</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Dropoff Time:</b></td>
                                        <td className="details-table-cell">11:15 PM</td>
                                    </tr>
                                    <tr>
                                        <td className="details-table-cell"><b>Unit Dispatched:</b></td>
                                        <td className="details-table-cell">{this.props.obj.dispatched}</td>
                                    </tr>
                                </table>
                                <button onClick={this.toggleModal} className="close-button" style={{color: 'white', textDecoration:'none'}}>Close</button>
                                <button onClick={this.handleDelete} className="delete-button" style={{color: 'white', textDecoration:'none'}}>Delete Ride</button>
                            </div>
                        </Modal>
                    </div>
                </tr>
            );
        }
        else{
            return(
                <tr>
                    <td className="rides-table-cell">{this.formatTime()}</td>
                    <td className="rides-table-edit-cell"><input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} className="form-control" /></td>
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
                    <td className="rides-table-edit-cell"><select name="pickup" value={this.state.pickup} onChange={this.handleInputChange} className="form-control">
                        {this.populateLocations()}
                    </select></td>
                    <td className="rides-table-edit-cell"><select name="dropoff" value={this.state.dropoff} onChange={this.handleInputChange} className="form-control">
                        {this.populateLocations()}
                    </select></td>
                    <td className="rides-table-edit-cell">11:00 PM</td>
                    <td className="rides-table-edit-cell">11:15 PM</td>
                    <td className="rides-table-edit-cell"><select name="dispatched" value={this.state.dispatched} onChange={this.handleInputChange} className="form-control">
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
