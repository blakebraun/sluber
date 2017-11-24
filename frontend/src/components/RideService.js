import axios from 'axios';

class RideService{

    sendData(data) {
        axios.post('http://localhost:4200/rides/add/post',{
                name:data.name,
                banner:data.banner,
                phone:data.phone,
                email: data.email,
                pickup: data.pickup,
                dropoff: data.dropoff,
                received: data.received,
        })
        .then(res => this.setState({rides: res.data}))
        .catch(err => console.log(err))
    }

    updateData(data, id){
        axios.post('http://localhost:4200/rides/update/'+id, {
            name:data.name,
            banner:data.banner,
            phone:data.phone,
            email: data.email,
            pickup: data.pickup,
            dropoff: data.dropoff,
            dispatched: data.dispatched
        })
        .then(res => this.setState({ rides:res.data}))
        .catch(err => console.log(err))
    }
	
	deleteData(id){
	    axios.get('http://localhost:4200/rides/delete/'+id)
	    .then().catch(err => console.log(err))
	  }
}

export default RideService;
