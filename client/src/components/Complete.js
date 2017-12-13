import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Complete extends Component {

    render() {
        return(
            <div className="main-content">
                <img src="/img/logo.png" alt="SLUber" height="100px" className="logo" />
                <h1>Thanks for requesting a ride!</h1><br />
                Your ride will arrive shortly.<br />
                <div className='btn-area'>
                    &nbsp;<Link to={"/"} className="button" style={{color: 'white', textDecoration:'none'}}>Back to Home</Link>
                </div>
            </div>
        )
    }

}

export default Complete;