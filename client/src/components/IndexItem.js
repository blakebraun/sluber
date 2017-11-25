import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class IndexItem extends Component {
    render() {
       return(
           <div className="main-content">
                <img src="/img/SLUber.png" alt="SLUber" height="100px" className="logo" />
               <div className="intro">
                   <h2>Welcome to SLU Ride!</h2><hr />
                   <h4>Our Hours:</h4>
                   Mon - Wed 6pm-1am<br />
                   Thurs 6pm - 2am <br />
                   Fri 6pm - 3am <br />
                   Sat 7am - 3am <br />
                   Sun 7am - 1am<hr />
                   <h3>Current Rides in Queue:</h3>
                   <h1>4</h1>
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

export default IndexItem;

