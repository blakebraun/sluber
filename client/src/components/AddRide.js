import React, {Component} from 'react';
import RideService from './RideService';
import {Link} from 'react-router-dom';
import {geolocated, geoPropTypes} from 'react-geolocated';

let locations = require('../locations');


class AddRide extends Component {

    constructor(props) {
        super(props);

        let now = Date.now();

        this.state = {pickupLoc:"BSC", dropoffLoc:"BSC", received:now, riders:"1", advice:"Use My Location",
        lat: 0, long: 0};
        this.addRideService = new RideService();
        this.geoOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleGeolocate = this.handleGeolocate.bind(this);
        this.findClosest = this.findClosest.bind(this);
        this.validateForm = this.validateForm.bind(this);
        this.populateLocations = this.populateLocations.bind(this);
        this.addRideService.sendData = this.addRideService.sendData.bind(this);
    }

    validateForm() {
        let bannerPattern = new RegExp("00[0-9]{7}");
        let phonePattern = new RegExp("[0-9]{10}");
        let emailPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
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
        else if(this.state.pickupLoc === this.state.dropoffLoc) {
            alert("Pickup and dropoff locations may not be the same.")
            return false;
        }
        else{
            return true;
        }
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
            console.log(this.state.id);
            this.props.history.push('/complete/');
        }
    }

    findClosest(pos){
        let lat = pos.coords.latitude;
        let long = pos.coords.longitude;
 //       let lat = '38.634830';
 //       let long = '-90.224989';


        let min = 99999;
        let closest;
        let index;

        for (index = 0; index < locations.length; ++index) {

            let lat2 = locations[index][1];
            if( lat2 !== 'NA') {

                let dif = getDist(lat, long, locations[index][1], locations[index][2]);
                if (dif < min) {
                    closest = index;
                    min = dif;
                }
            }
        }

        function getDist(lat1, long1, lat2, long2){
            let R = 6371; // Radius of the earth in km
            let dLat = degToRad(lat2-lat1);  // deg2rad below
            let dLon = degToRad(long2-long1);
            let a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
         //   let d = R * c; // Distance in km
            return R * c;
        }


        function degToRad(deg){
            return deg * (Math.PI/180);
        }

        const newText = locations[closest][0];
        this.setState({pickupLoc: newText});
    }

    handleGeolocate() {

        if ("geolocation" in navigator) {
            /* geolocation is available */

            const geo = navigator.geolocation;

            function fail(err) {
                console.warn(`ERROR(${err.code}): ${err.message}`);
                alert("Location failed.");
            }

            geo.getCurrentPosition( this.findClosest, fail , this.geoOptions );

        } else {
            /* geolocation IS NOT available */
            const newText = 'fail';
            this.setState({advice: newText});
        }

    }

    render(){
        return(
                <div className="main-content" padding="5">
                    <img src="/img/logo.png" alt="SLU Ride" height="100px" className="logo" />
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
                                <select name="pickupLoc" value={this.state.pickupLoc} onChange={this.handleInputChange} className="form-control" required>
                                    {this.populateLocations()}
                                </select>
                        <br />
                        <input type = "button" className = "button" value = {this.state.advice} onClick = {this.handleGeolocate} />
                        <br />
                        <br />
                        <h4>Dropoff Location:</h4>
                                <select name="dropoffLoc" value={this.state.dropoffLoc} onChange={this.handleInputChange} className="form-control" required>
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


AddRide.propTypes = Object.assign({}, AddRide.propTypes, geoPropTypes);

//export default AddRide;
export default geolocated()(AddRide);