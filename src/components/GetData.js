import React, { Component } from 'react'
import axios from 'axios';
export class GetData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityName: '',
            location: '',
            latitude: '',
            longitude: '',
            iemge: '',
            error: '',
            show: false,
            weather: [],
            movies: []
        }
    }
    onchangeForTyping = (e) =>///////1
    {
        this.setState({
            cityName: e.target.value
        })
    }
    toSubmitTheForm = async (e) => {/////2
        try {
            e.preventDefault();
            let axiosResp = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.c6f749ed3369fcaa6d4dfb08d3391e9c&city=${this.state.cityName}&format=json`)
            this.setState({
                show: true,
                cityName: axiosResp.data[0].display_name,
                location: axiosResp.data[0].display_name,
                latitude: axiosResp.data[0].lat,
                longitude: axiosResp.data[0].lon,
                error: ' '
            })
            let map = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=pk.c6f749ed3369fcaa6d4dfb08d3391e9c&center=${this.state.latitude},${this.state.longitude}&zoom=10`)
            this.setState({
                iemge: map.config.url
            })
        }
        catch {
            e.preventDefault();
            this.setState({
                show: false,
                error: 'Try to type correct name of city or be confirm about other input imformations'
            })
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////weatherApp
        try {
            e.preventDefault();
            let weatherGet = await axios.get(`http://localhost:4522/weather?api_key=594c7c8309bb3794d6576a4ee7f79381&lat=${this.state.latitude}&lon=${this.state.longitude}`)
            this.setState({
                weather: weatherGet.data,
                show: true
            })
        } catch {
            e.preventDefault();
            this.setState({
                show: false,
                error: 'Try to type correct name of city or be confirm about other input imformations'
            })
        }
        console.log('before show',process.env.REACT_APP_SERVER_API)
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////MoviesApp
        try {
            e.preventDefault();
            let moviesGet = await axios.get(`http://localhost:4522/movies?query=${this.state.cityName}`)
            this.setState({
                moveis: moviesGet.data,
                show: true
            })
        } catch {
            e.preventDefault();
            this.setState({
                show: false,
                error: 'Try to type correct name of city or be confirm about other input imformations'
            })
        }
    }
    render() {
        return (
            <div style={{ backgroundColor: ('#FAEBE0') }}>
                <header>
                    <h1 style={{ fontFamily: ('cursive') }}>Explore about cities</h1>
                </header>
                <form onSubmit={this.toSubmitTheForm}>
                    <input type='text' placeholder='Type the city name....' onChange={(e) => { this.onchangeForTyping(e) }} />
                    <button type='submit'>Explore!</button>
                </form>
                <h4>
                    {this.state.error}
                </h4>
                {
                    this.state.show &&
                    <h2>Location is:{this.state.location} </h2>, <br />, <br />
                }
                <h2>Location is:{this.state.cityName} </h2><br /><br />
                <h2>Latitude is:{this.state.latitude}</h2><br /><br />
                <h2>Longitude is:{this.state.longitude}</h2><br /><br />
                <h2>The map below</h2>
                <img src={this.state.iemge}></img>
                {
                    this.state.show &&
                    console.log('after', this.state.weather.description),
                    this.state.weather.map((element, index) => {
                        return (
                            <h4>Description:{element.description}</h4>,
                            <h5>Date of:{element.date}</h5>
                        )
                    })
                }
                {
                    this.state.show &&
                    this.state.movies.map((ele,indx)=>{
                        return(
                        <h4>The title of movie:{ele.title}</h4>,
                        <h5>Have Votes:{ele.votes}</h5>,
                        <img src={ele.img}></img>
                        )
                    })
                }
            </div>
        )
    }
}
export default GetData

// import React, { Component } from 'react'
// import axios from 'axios'
// import AleartMessage from './AleartMessage'
// import { Form, Button } from 'react-bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css';
// require("dotenv").config();

// export class GetData extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             display: false,
//             dispName: '',
//             lat: '',
//             lon: '',
//             alertmess: false,
//             imgMap: '',
//             dataweth: [],
//             showdataweth: false,
//             movieData: [],
//             displaymovie:false
//         }
//     }
//     gitCityName = (e) => {
//         this.setState({
//             dispName: e.target.value,
//         })
//     }

//     handelSubmit = async (e) => {
//         e.preventDefault()
//         //                                                  api_key=${MOVIE_API_KEY}&query=${city_name}
//         let wethwerURL = `http://localhost:4522/weather?key=${process.env.WEATHER_API_KEY}&lat=${this.state.lat}&lon=${this.state.lon}`
//         let movieURL = `http://localhost:4522/movie?api_key=${this.state.dispName}&query=${this.state.dispName}`
//         try {
//             let axiosData = await axios.get(`https://eu1.locationiq.com/v1/search.php?key=pk.72479576e80a134c898131754a3ccdee&q=${this.state.dispName}&format=json`)
//             this.setState({
//                 dispName: axiosData.data[0].display_name,
//                 lon: axiosData.data[0].lon,
//                 lat: axiosData.data[0].lat,
//                 display: true,
//                 alertmess: false,
//                 showdataweth: true,

//             })
//             let axiosMap = await axios.get(`https://maps.locationiq.com/v3/staticmap?key=pk.72479576e80a134c898131754a3ccdee&q&center=${this.state.lat},${this.state.lon}&zoom=10`)
//             this.setState({
//                 imgMap: axiosMap.config.url
//             })
//         }
//         catch {
//             this.setState({
//                 showdataweth: false,
//                 alertmess: true

//             })
//         }


//         try {
//             const axiosWeather = await axios.get(wethwerURL)
//             console.log(axiosWeather);
//             console.log(process.env.REACT_APP_SERVER)
//             this.setState({
//                 dataweth: axiosWeather.data,
//                 showdataweth: true
//             })
//         }
//         catch {
//             this.setState({
//                 showdataweth: false,
//                 alertmess: true,
//                 display: false
//             })
//         }
//         try{
//             const movieReq = await axios.get(movieURL);
//         this.setState({
//             movieData: movieReq.data,
//             displaymovie:true
//         })
//         }
//         catch {
//             this.setState({
//                 displaymovie: false
//             })
//         }

//     }


// render()
// {
//     return (
//         <div style={{ margin: 'auto' }} >

//             <AleartMessage alertmess={this.state.alertmess} />
//             <Form onSubmit={this.handelSubmit} style={{ margin: 'auto', width: '30%', marginTop: '90px' }}>
//                 <Form.Group >
//                     <Form.Control size="lg" type="text" placeholder='type city name ...' onInput={(e) => { this.gitCityName(e) }} />
//                     <br />

//                     <Form.Control style={{ background: 'Beige' }} type="submit" value='Explore!' />
//                 </Form.Group>
//             </Form>
//             <div style={{ textAlign: 'center', marginTop: '50px', color: 'green', fontFamily: 'cursive' }} >



//                 {this.state.display && <div>
//                     <h4>{this.state.dispName}</h4>
//                     <h4>{this.state.lon}</h4>
//                     <h4>{this.state.lat}</h4>
//                     <img src={this.state.imgMap} rounded="true" />
//                 </div>}

//                 {
//                     this.state.showdataweth && this.state.dataweth.map((item, idx) => {
//                         return (
//                             <>
//                                 <p>{item.description}</p>
//                                 <p>{item.valid_date}</p>
//                             </>
//                         );
//                     })
//                 }
//                 {
//                     this.state.displaymovie && this.state.movieData.map(item=>{
//                         return (
//                             <>
//                             <img src={this.state.item.poster_path} alt={this.state.item.title} />
//                             </>
//                         )
//                     })
//                 }

//             </div>
//         </div>
//     )
// }
// }
// export default GetData