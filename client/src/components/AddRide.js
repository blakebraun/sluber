import React, {Component} from 'react';
import RideService from './RideService';
import {Link} from 'react-router-dom';
let locations = require('../locations');

class AddRide extends Component {

    constructor(props) {
        super(props);

        let now = Date.now();

        this.state = {pickup:"BSC", dropoff:"BSC", received:now, riders:"1"};
        this.addRideService = new RideService();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.populateLocations = this.populateLocations.bind(this);
        this.addRideService.sendData = this.addRideService.sendData.bind(this);
    }

    validateForm() {
        let bannerPattern = new RegExp("00[0-9]{7}");
        let phonePattern = new RegExp("[0-9]{10}");
        let emailPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        let riderPattern = new RegExp("[1-6]");

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
        else if(this.state.pickup === this.state.dropoff) {
            alert("Pickup and dropoff locations may not be the same.")
            return false;
        }
        else{
            return true;
        }
    }

    populateLocations() {
        return locations.map(function(location, i){
            return <option value={location} key={i}>{location}</option>;
        })
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const fieldName = target.name;

        this.setState({[fieldName]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validateForm()) {
            this.addRideService.sendData(this.state);
            console.log(this.state.id)
            this.props.history.push('/complete/');
        }
    }

    render(){
        return(
                <div className="main-content" padding="5">
                    <h1>Request a Ride!</h1><hr />
                    <form onSubmit={this.handleSubmit}>
                        <h4>Name:</h4>
                                <input name="name" type="text" value={this.state.name} placeholder="Full Name" onChange={this.handleInputChange} className="form-control" required />
                        <h4>Banner ID:</h4>
                                <input name="banner" type="text" pattern="\d*" value={this.state.banner} placeholder="000123456" onChange={this.handleInputChange} className="form-control" required />
                        <h4>Phone Number:</h4>
                                <input name="phone" type="text" pattern="\d*" value={this.state.phone} placeholder="3145555555" onChange={this.handleInputChange} className="form-control" required />
                        <h4>Email:</h4>
                                <input name="email" type="text" value={this.state.email} placeholder="first.last@slu.edu" onChange={this.handleInputChange} className="form-control" required />
                        <h4>Number of Riders:</h4>
                            <select name="riders" value={this.state.riders} onChange={this.handleInputChange} className="form-control" required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        <h4>Pickup Location:</h4>
                                <select name="pickup" value={this.state.pickup} onChange={this.handleInputChange} className="form-control" required>
                                    {this.populateLocations()}
                                </select>
                        <h4>Dropoff Location:</h4>
                                <select name="dropoff" value={this.state.dropoff} onChange={this.handleInputChange} className="form-control" required>
                                    {this.populateLocations()}
                                </select>
                        <br/>
                        <input type="submit" value="Submit" className="button"/>
                    </form>
							<br/>
					<Link to={"/"} className="button" style={{color: 'white', textDecoration:'none'}}>Back to Home</Link>
				</div>
        );
    }
}

export default AddRide;