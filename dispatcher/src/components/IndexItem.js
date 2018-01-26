import React, {Component} from 'react';
import RideService from './RideService';
import axios from 'axios';
import TableRow from './TableRow';
import {Link} from 'react-router-dom';
import {connect, PromiseState} from 'react-refetch';
let config = require('../config');

class IndexItem extends Component {

    constructor(props) {
        super(props);
        this.state = {value:'', rides:''};
        this.addRideService = new RideService();
    }
/*
    componentDidMount(){
        axios.get(config.backendURL + '/rides')
            .then(response=>{
                this.setState({rides:response.data});
            })
            .catch(function(error){
                console.log(error);
            })
    }

    tabRow(){
        if(this.state.rides instanceof Array){
            return this.state.rides.map(function(object, i){
                return <TableRow obj={object} key={i}/>;
            })
        }
    }
*/

    tabRow(){
       if(this.props.ridesFetch.value instanceof Array){
           return this.props.ridesFetch.value.map(function (object, i) {
               return <TableRow obj={object} key={i}/>;
           })
       }
    }


    render() {
       return(
           <div>
            <img src="/img/dispatcher.png" alt="SLU Ride Dispatcher Console" height="100px" />
               <Link to={"/add-ride"} className="add-button" style={{color: 'white', textDecoration:'none'}}>Add Ride</Link>
               <hr />
               <div className="container">
                <table className="table table=striped">
                    <thead>
                        <tr>
                            <td><b>Time Received</b></td>
                            <td><b>Name</b></td>
                            <td><b>Banner</b></td>
                            <td><b>Phone Number</b></td>
                            <td><b>Email</b></td>
                            <td><b>Start Location</b></td>
                            <td><b>End Location</b></td>
                            <td><b>Unit Dispatched</b></td>
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

export default connect(props => ({
    ridesFetch: {url:`${config.backendURL}/rides`, refreshInterval: 1000}
}))(IndexItem)

