import React, {Component} from 'react';
import ItemService from './ItemService';
import {Link} from 'react-router-dom';

class AddItem extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.addItemService = new ItemService();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.addItemService.sendData(this.state.value);
        this.props.history.push('/index');
    }

    render(){
        return(
                <div className="container" padding="5">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Add Item:
                                <input type="text" value={this.state.value} onChange={this.handleChange} className="form-control"/>
                        </label><br/>
                        <input type="submit" value="Submit" className="btn btn-primary"/>
                    </form>
							<br/>
					<Link to={"/index"} className="btn btn-primary">Back to List</Link>
				</div>
        );
    }
}

export default AddItem;
