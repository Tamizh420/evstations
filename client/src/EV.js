import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Booking from './booking';





class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            localdata: [],
            locations: ''

        }
    }

    usehandlechange = (event) => {
        this.setState({ input: event.target.value });
        this.setState({ locations: event.target.value })
    };
    usehandlesubmit = async (event) => {
        event.preventDefault();
        const { locations } = this.state;
        console.log(this.state.input);
        const response = await axios.post('/apidata', { locations })
            .then((res) => this.setState({ localdata: res.data.local_results }))
            .catch((err) => console.log(err))
        console.log(response);

    }

    handlesubmit = async (event) => {

        event.preventDefault()



    }
    render() {
        const url = "https://maps.google.com/maps?q=electric+vechical+charging+stations+all+over+" + this.state.input + "&t=&z=13&ie=UTF8&iwloc=&output=embed"


        return (
            <>
                <div className='row'>
                    <div className='container col' >
                        <h3>Electric vechicle charging <br></br> stations Location</h3>

                        <center>  <form onSubmit={this.usehandlesubmit}>
                            <div className='row' style={{ width: "460px" }}>
                                <div className='col p-2' style={{ width: "100px", backgroundColor: "" }}>
                                    <input type="text" className='form-control rounded-0' style={{ width: '300px', }} value={this.state.input} name="" onChange={this.usehandlechange}></input>
                                </div>
                                <div className='col' style={{ width: "50px", alignItems: "center", justifyContent: "center" }}>
                                    <input type="submit" className='btn btn-primary' name="" value="search"></input>
                                </div>
                            </div>

                        </form></center>
                        <iframe width="900" height="400" id="osm_canvas" src={url} frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                        </iframe>
                    </div>

                    <div className='col'>
                        {Object.entries(this.state.localdata).map((item, key) => (

                            <>{console.log(item)}
                                <div className='border border-primary' key={item.id}>
                                    <strong>Position:{item[1].position}</strong>
                                    <strong><p style={{ color: "green" }}>Title:{item[1].title}</p></strong><br></br>
                                    <strong><span style={{ color: "green" }}>Type:</span>{item[1].type}</strong><br></br>
                                    <strong><span style={{ color: "green" }}>Address:</span>{item[1].address}</strong><br></br>
                                    <strong><span style={{ color: "green" }}>Phone:</span>{item[1].phone}</strong><br></br>
                                    <strong><span style={{ color: "green" }}>Hours:</span>{item[1].hours}</strong><br></br>
                                    <strong><span style={{ color: "green" }}>Rating:</span>{item[1].rating}</strong> <br></br>
                                    <strong>{item[1].place_id}</strong>

                                    <Link to={`/booking.js/`} ><button className='btn btn-danger' onClick={this.setid} type="button">Book now</button></Link>
                                </div>


                            </>

                        ))
                        }
                    </div>

                    <Booking type={this.setid} ></Booking>
                </div>





                <form onSubmit={this.handlesubmit}>
                    <input type="text" name="locations" onChange={this.handlesearch} autoComplete="off" placeholder="Search" value={this.state.locations}></input>
                    <input type="submit" name="" value="submit"></input>

                </form>

            </>
        )
    }
}
export default Map


