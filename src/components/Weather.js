import React from 'react';
import WeatherDay from './WeatherDay'

class Weather extends React.Component {
  render() {
    return (
      this.props.weatherData.map(item => {
        return (
          <>
            {/* <p> Date:<span>{item.date} </span> <br />
            Description:<span>{item.description}</span></p> */}

            <WeatherDay
              date={item.date}
              description={item.description} />
          </>
        );
      })
    );
  }
}
export default Weather;