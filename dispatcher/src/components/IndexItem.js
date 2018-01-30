import React, {Component} from 'react';
import RideService from './RideService';
import axios from 'axios';
import TableRow from './TableRow';
import {Link} from 'react-router-dom';
import {connect, PromiseState} from 'react-refetch';
import Modal from 'react-modal';
import AddRide from './AddRide';
let config = require('../config');

class IndexItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value:'',
            rides:'',
            modalIsOpen: false
        };
        this.addRideService = new RideService();
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    tabRow(){
       if(this.props.ridesFetch.value instanceof Array){
           return this.props.ridesFetch.value.map(function (object, i) {
               return <TableRow obj={object} key={i}/>;
           })
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

    render() {
       return(
           <div>
           <div>
            <img src="/img/dispatcher.png" alt="SLU Ride Dispatcher Console" height="100px" className="main-logo" />
               {/*<Link to={"/add-ride"} className="add-button" style={{color: 'white', textDecoration:'none'}}>Add Ride</Link>*/}
               <div>
                    <button onClick={this.openModal} className="add-button" style={{color: 'white', textDecoration:'none'}}>Add Ride</button>
                   <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Test"
                        className={{
                            base: 'modal-content'
                        }}
                        overlayClassName={{
                            base: 'modal-overlay'
                        }}
                    >
                        <AddRide close={this.closeModal}/>
                    </Modal>
               </div>

               </div>
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
    ridesFetch: {url:`${config.backendURL}/rides`, refreshInterval: 5000}
}))(IndexItem)

