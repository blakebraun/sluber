import React, {Component} from 'react';
import ItemService from './ItemService';
import {Link} from 'react-router-dom';

class AddItem extends Component {

    constructor(props) {
        super(props);

        this.state = {pickup:"BSC", dropoff:"BSC"};
        this.addItemService = new ItemService();

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({[name]: value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.addItemService.sendData(this.state);
        this.props.history.push('/index');
    }

    render(){
        return(
                <div className="container" padding="5">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name:
                                <input name="name" type="text" value={this.state.name} onChange={this.handleInputChange} className="form-control"/>
                            Banner ID:
                                <input name="banner" type="text" value={this.state.banner} onChange={this.handleInputChange} className="form-control"/>
                            Phone Number:
                                <input name="phone" type="text" value={this.state.phone} onChange={this.handleInputChange} className="form-control"/>
                            Email:
                                <input name="email" type="text" value={this.state.email} onChange={this.handleInputChange} className="form-control"/>
                            Pickup Location:
                                <select name="pickup" value={this.state.pickup} onChange={this.handleInputChange} className="form-control">
                                    <option value="BSC">BSC</option>
                                    <option value="Griesedieck">Griesedieck</option>
                                    <option value="Marchetti">Marchetti</option>
                                    <option value="Reinert">Reinert</option>
                                    <option value="Spring">Spring</option>
                                </select>
                            Dropoff Location:
                                <select name="dropoff" value={this.state.dropoff} onChange={this.handleInputChange} className="form-control">
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
