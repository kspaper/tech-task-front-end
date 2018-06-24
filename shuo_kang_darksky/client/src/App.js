import React, { Component } from 'react';
import callAPI from './Components/APIHelper';
import CallLocation from './Components/LocationHelper';
import Weather from './Components/Weather';
import Others from './Components/Others';
import sun from './svg/clear-day.svg';
import night from './svg/clear-night.svg';
import cloudy from './svg/cloudy.svg';
import fog from './svg/fog.svg';
import partlyday from './svg/partly-cloudy-day.svg';
import partlynight from './svg/partly-cloudy-night.svg';
import rain from './svg/rain.svg';
import sleet from './svg/sleet.svg';
import snow from './svg/snow.svg';
import wind from './svg/wind.svg';
import loader from './Components/Loader';
import loading from './svg/loading.gif';

class App extends Component {
  state = {
    loaded: false
  }
  constructor() {
    super();
    loader.load(v => this.setState({ loaded: true }));
    this.state = {
      location: undefined,
      temperature: undefined,
      description: undefined,
      precipitation: undefined,
      humidity: undefined,
      wind: undefined,
      icon: undefined,
      dateAttr: undefined,
      error: null,
    };

  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.queryDarkSky(position.coords.latitude, position.coords.longitude);
        },
      );
    } else {
      this.setState({
        error: new Error('Your browser does not support geolocation'),
      });
    }
  }

  queryDarkSky = (lat, long) => {
    const url = `/api/darksky?latitude=${lat}&longitude=${long}`;
    callAPI(url, this.onDarkSkySuccess, this.onDarkSkyFailure);
  }

  onDarkSkySuccess = (payload) => {
    const temperature = payload && payload.currently.temperature;
    const description = payload && payload.currently.summary;
    const precipitation = payload && payload.currently.precipIntensity;
    const humidity = payload && payload.currently.humidity;
    const wind = payload && payload.currently.windSpeed;
    const icon = payload && payload.currently.icon;
    const dateAttr = payload && payload.currently.time;
    this.setState({
      temperature,
      description,
      precipitation,
      humidity,
      wind,
      icon,
      dateAttr,
      error: null
    });
  }

  onDarkSkyFailure = (error) => {
    this.setState({
      error
    });
  }

  getcelsius = () => {
    return Math.round((this.state.temperature - 32) * 5 / 9, 1)
  }

  getPercent = (data) => {
    return Math.round((data * 100), 1)
  }

  getIcon() {
    const summary = this.state.icon;
    switch (summary) {
      case 'clear-day':
        return <img src={sun} alt={summary} />;
      case 'clear-night':
        return <img src={night} alt={summary} />;
      case 'cloudy':
        return <img src={cloudy} alt={summary} />;
      case 'fog':
        return <img src={fog} alt={summary} />;
      case 'partly-cloudy-day':
        return <img src={partlyday} alt={summary} />;
      case 'partly-cloudy-night':
        return <img src={partlynight} alt={summary} />;
      case 'rain':
        return <img src={rain} alt={summary} />;
      case 'sleet':
        return <img src={sleet} alt={summary} />;
      case 'snow':
        return <img src={snow} alt={summary} />;
      case 'wind':
        return <img src={wind} alt={summary} />;
      default:
        return <img src={sun} alt={summary} />;
    }
  }

  getDate() {
    const d = Date.now();
    return new Intl.DateTimeFormat('en-US',
      {
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit'
      }).format(d);
  }

  render() {
    let data;
    if (this.state.loaded) {
      data =
        <div className="wrapper">
          <div className="main">
            <div className="container">
              <div className="row">
                <div className="col-xs-5 left-container"><CallLocation />
                  <Weather
                    //temperature = {this.state.temperature}
                    dateAttr={this.getDate()}
                    temperature={this.getcelsius()}
                    description={this.state.description}
                    imgSrc={this.getIcon()} /></div>
                <div className="col-xs-7 right-container">
                  <Others
                    precipitation={this.getPercent(this.state.precipitation)}
                    humidity={this.getPercent(this.state.humidity)}
                    wind={this.state.wind} /></div>
              </div>
            </div>
          </div>
        </div>
    } else {
      data =
        <div className="loadingpg">
          <p> I am loading, please wait ... </p>
          <img src={loading} alt="Loading" />
        </div>
    }
    return (
      <div>
        {data}
      </div>

    );
  }
}


export default App;
