// require("dotenv").config();
import React, { Component } from 'react'
import axios from 'axios'
import AleartMessage from './AleartMessage'
import {Form,Button} from 'react-bootstrap'
// import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

 

export class GetData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: false,
            dispName: '',
            lat: '',
            lon: '',
            alertmess: false,
            imgMap:'',
            dataweth:[],
            showdataweth:false
        }
    }
    gitCityName = (e) => {
        this.setState({
            dispName: e.target.value,
        })
    }

    handelSubmit = async (e) => {
        // e.preventDefault()
        try {
            e.preventDefault()
            let axiosData = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.72479576e80a134c898131754a3ccdee&q=${this.state.dispName}&format=json`)
           
            this.setState({
                dispName: axiosData.data[0].display_name,
                lon: axiosData.data[0].lon,
                lat: axiosData.data[0].lat,
                display: true,
                alertmess: false,
                showdataweth:true

            })

            let axiosMap = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=pk.72479576e80a134c898131754a3ccdee&q&center=${this.state.lat},${this.state.lon}&zoom=10`)
            this.setState({
                imgMap:axiosMap.config.url,
                 showdataweth:true
            })

        }
        catch {
            this.setState({
                showdataweth:false,
                alertmess: true
                
            })
        }

        try{
            e.preventDefault()
           let axiosWeather = await axios.get(`http://localhost:8000/weather?key=${process.env.KYE}&lat=${this.state.lat}&lon=${this.state.lon}`)
           this.setState({
               dataweth:axiosWeather.data,
            //    showdataweth:true
           })
        }
        catch{
            this.setState({
                
                showdataweth:false
            })
        }
    }

    render() {
        return (
            <div style={{margin:'auto' }} >
                
                <AleartMessage alertmess={this.state.alertmess} />
                <Form onSubmit={this.handelSubmit} style={{ margin:'auto',width:'30%', marginTop:'90px'}}>
                <Form.Group >
                    <Form.Control size="lg" type="text" placeholder='type city name ...' onInput={(e) => { this.gitCityName(e) }} />
                    <br />
                    
                    <Form.Control style={{background:'Beige' }} type="submit" value='Explore!'/>
                </Form.Group>
                </Form>
                <div style={{ textAlign:'center',marginTop:'50px',color:'green' , fontFamily:'cursive'}} >

                
                <h4>{this.state.dispName}</h4>
                <h4>{this.state.lon}</h4>
                <h4>{this.state.lat}</h4>
                {this.state.display && <div>
                    <img src={this.state.imgMap} rounded="true" />
                </div>}
                
                {
                    this.state.showdataweth&& this.state.dataweth.map((item,idx)=>{
                        return (
                            <>
                            <p>{item.description}</p>
                            <p>{item.valid_date}</p>
                            </>
                        );
                    })
                } 
                </div>
              

            </div>
        )
    }
}
export default GetData