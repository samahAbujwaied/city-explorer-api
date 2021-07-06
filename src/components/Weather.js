import React from 'react';
import WeatherDay from './WeatherDay'
import './style.css'
class Weather extends React.Component {
  render() {
    return (
      this.props.weatherData.map(item => {
        return (
          <div className="data">
            <WeatherDay 
              date={item.date}
              description={item.description} />
          </div>
        );
      })
    );
  }
}
export default Weather;