import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import RideService from './RideService';
import {connect, PromiseState} from 'react-refetch';
let config = require('../config');

class IndexItem extends Component {

    constructor(props){
        super(props);
        this.state = {count:0};
        this.addRideService = new RideService();
        this.addRideService.getCount = this.addRideService.getCount.bind(this);
        this.getRideCount = this.getRideCount.bind(this);
    }

    componentWillMount(){
        this.addRideService.getCount();
    }

    getRideCount(){
       // if(this.props.ridesFetch.value instanceof Number){
            return(this.props.ridesFetch.value);
       // }
    }

    render() {
       return(
           <div className="main-content">
                <img src="/img/logo.png" alt="SLU Ride" height="100px" className="logo" />
               <div className="intro">
                   <h2>Welcome to SLU Ride!</h2><hr />
                   <h4>Our Hours:</h4>
                   Mon - Wed 6pm-1am<br />
                   Thurs 6pm - 2am <br />
                   Fri 6pm - 3am <br />
                   Sat 7am - 3am <br />
                   Sun 7am - 1am<hr />
                   <h3>Current Rides in Queue:</h3>
                   <h1>{this.getRideCount()}</h1>
               </div><hr />
               <div className="btn-area">
                    <Link to={"/add-ride"} className="button" style={{color: 'white', textDecoration:'none'}}>Request a Ride!</Link>
               </div>
               <br />
               Call us at 314-977-RIDE! (<a href="tel:314-977-7433">314-977-7433</a>)
            </div>
        );
    }
}

export default connect(props => ({
    ridesFetch: {url:`${config.backendURL}/rides/count`, refreshInterval: 1000}
}))(IndexItem)

