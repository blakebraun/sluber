import React, {Component} from 'react';
import ItemService from './ItemService';
import {Link} from 'react-router-dom';

class AddItem extends Component {

    constructor(props) {
        super(props);

        let now = Date.now();

        this.state = {pickup:"BSC", dropoff:"BSC", received:now};
        this.addItemService = new ItemService();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    validateForm() {
        let bannerPattern = new RegExp("00[0-9]{7}");
        let phonePattern = new RegExp("[0-9]{10}");
        let emailPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")

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
            alert("Pickup and dropoff locations may not be the same.")
            return false;
        }
        else{
            return true;
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.validateForm()) {
            this.addItemService.sendData(this.state);
            this.props.history.push('/index');
        }
    }

    render(){
        return(
                <div className="container" padding="5">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                                <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} className="form-control" required />
                            Banner ID:
                                <input name="banner" type="text" value={this.state.banner} onChange={this.handleInputChange} className="form-control" required />
                            Phone Number:
                                <input name="phone" type="text" value={this.state.phone} onChange={this.handleInputChange} className="form-control" required />
                            Email:
                                <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} className="form-control" required />
                            Pickup Location:
                                <select name="pickup" value={this.state.pickup} onChange={this.handleInputChange} className="form-control" required>
                                    <option value="BSC">BSC</option>
                                    <option value="Griesedieck">Griesedieck</option>
                                    <option value="Marchetti">Marchetti</option>
                                    <option value="Reinert">Reinert</option>
                                    <option value="Spring">Spring</option>
                                </select>
                            Dropoff Location:
                                <select name="dropoff" value={this.state.dropoff} onChange={this.handleInputChange} className="form-control" required>
                                    <option value="BSC">BSC</option>
                                    <option value="Griesedieck">Griesedieck</option>
                                    <option value="Marchetti">Marchetti</option>
                                    <option value="Reinert">Reinert</option>
                                    <option value="Spring">Spring</option>
                                </select>
                        </label>
                        <br/>
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </form>
							<br/>
					<Link to={"/index"} className="btn btn-primary">Back to List</Link>
				</div>
        );
    }
}

export default AddItem;
