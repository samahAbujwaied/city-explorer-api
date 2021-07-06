import React from 'react';
import axios from 'axios';
import Weather from './components/Weather.js';
import Movie from './components/Movie.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button,Image,Col,Row,Container} from 'react-bootstrap'

import './App.css'
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citySearched: '',
      output: '',
      show: false,
      errorMessage: false,
      weatherData: [],
      movieData: [],
      apiKey: `pk.b2d1d28fe6236b24f76b7d5f8e2403d6`

    }
  }

  getLocation = async (e) => {
    e.preventDefault();   
    const serverRoute = process.env.REACT_APP_BACKEND ;
    console.log(serverRoute);
    let weatherURL = `${serverRoute}/weather?searchQuery=${this.state.citySearched}`;
    let LocUrl = `https://eu1.locationiq.com/v1/search.php?key=${this.state.apiKey} &q=${this.state.citySearched}&format=json`;
    let movieURL = `${serverRoute}/movie?query=${this.state.citySearched}&limit=5`

    try {
      const locResult = await axios.get(LocUrl);

      this.setState({
        output: locResult.data[0],
        show: true,
      })

    }
    catch {
      this.setState({
        show: false,
        errorMessage: true
      })
    }
    const weatherReq = await axios.get(weatherURL);
    this.setState({
      weatherData: weatherReq.data[0],
    })
    const movieReq = await axios.get(movieURL);
    this.setState({
      movieData: movieReq.data,
    })
  }

  updateSearch = (event) => {
    this.setState({
      citySearched: event.target.value,
    })

  }
  render() {
    return (
      <>
        <Form className="form" onSubmit={this.getLocation}>
          <Form.Group controlId="formBasicEmail">
            <Form.Text className="text-muted title">
              City Explorer
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <br/>
            <Form.Control className="input" type="text" placeholder="Enter Name of City or Country" onChange={this.updateSearch} />
          </Form.Group>
          <Button className="button"  type="submit">
          Explore!
          </Button>
        </Form>
        { this.state.show &&
          <p className="paragraph">
          City:<span>{this.state.output.display_name}</span> <br />
          Lat :<span>{this.state.output.lat}</span> <br />
          Lon :<span> {this.state.output.lon}</span>
          </p>
        }

        { this.state.show &&
        <Container className="img">
        <Row>
          <Col xs={6} md={4}>
            <Image src={`https://maps.locationiq.com/v3/staticmap?key=${this.state.apiKey}&center=${this.state.output.lat},${this.state.output.lon}`}  alt={this.state.display_name}  />
          </Col> 
        </Row>
      </Container>
       
        }
        { this.state.show &&
          <Weather weatherData={this.state.weatherData} />
        }
        { this.state.show &&

          <Movie movieData={this.state.movieData} />
        }

        { this.state.errorMessage &&
          <p>
            "error": "Unable to geocode"
          </p>
        }

      </>
    )
  }
}

export default App;