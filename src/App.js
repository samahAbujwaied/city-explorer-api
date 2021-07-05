import React from 'react';
import axios from 'axios';
import Weather from './components/Weather.js';
import Movie from './components/Movie.js';
// REACT_APP_SERVER= http://city-noor.herokuapp.com
// REACT_APP_SERVER= https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=3d43dfeb08b540b9a0dffca4f1351a7d

class App extends React.Component {
//as convention i should create a form.js and make App.js as a structure page
  constructor(props) {
    super(props);
    this.state = {
      citySearched: '',
      output: '',
      show: false,
      errorMessage: false,
      weatherData: [],
      movieData: [],
      apiKey :`pk.b2d1d28fe6236b24f76b7d5f8e2403d6`

    }
  }

  getLocation = async (e) => {
    e.preventDefault();

    const serverRoute = process.env.REACT_APP_SERVER;
    let weatherURL = `${serverRoute}/weather?searchQuery=${this.state.citySearched}`;
    let LocUrl = `https://eu1.locationiq.com/v1/search.php?key=${this.state.apiKey} &q=${this.state.citySearched}&format=json`;
    let movieURL = `${serverRoute}/movie?query=${this.state.citySearched}&limit=5`

    try {
      const locResult = await axios.get(LocUrl);
      
      this.setState({
        output: locResult.data[0],
        show: true,
      })
      // console.log(this.state.output);
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
    // console.log(this.state.citySearched);
  }
  render() {
    return (
      <>
        <h1>City Explorer</h1>
        <form onSubmit={this.getLocation}>
          <input type='text' placeholder='add a city' onChange={this.updateSearch} />
          <button value='Get Location'>Explore!</button>
        </form>

        { this.state.show &&
          <p>
            City:<span>{this.state.output.display_name}</span> <br />
          Lat / Long: <span>{this.state.output.lat}, {this.state.output.lon}</span></p>
        }

        { this.state.show &&
          <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${this.state.apiKey}&center=${this.state.output.lat},${this.state.output.lon}`} alt=''
          />
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

