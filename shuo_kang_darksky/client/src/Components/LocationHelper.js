import React, { Component } from 'react';
import Geocoder from 'react-native-geocoding';
import loader from './Loader';
import loading from './../svg/waiting.gif';
//import Weather from './Components/Weather';
require('es6-promise/auto');
require('isomorphic-fetch');

class LocationHelper extends Component {
    state = {
        loaded: false
    }
    constructor(props) {
        super(props);
        loader.load(v => this.setState({ loaded: true }));
        this.state = {
            location: undefined,
            latitude: undefined,
            longitude: undefined,
            suburb: undefined,
            state: undefined,
            zipcode: undefined
        }
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                }, () => this.queryGoogle());
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000 },
        );
    }

    queryGoogle = (lat, long) => {
        Geocoder.setApiKey('AIzaSyAZiAU5-p6XHMFwBQXbhZhr3izKckrZMdU');
        Geocoder.getFromLatLng(`${this.state.latitude},${this.state.longitude}`)
            .then(response => {
                console.log(response.results[0]);
                this.setState({
                    suburb: response.results[0].address_components[2].long_name,
                    state: response.results[0].address_components[4].short_name,
                    zipcode: response.results[0].address_components[6].long_name

                });
            }).catch((error) => { // catch is called after then
                this.setState({ error: error.message })
            });
    }

    render() {
        let data;
        if (this.state.loaded) {
            data =
                <div>
                    <span className="left-container__title">
                        {this.state.suburb} {this.state.state} {this.state.zipcode}
                    </span>
                    {/* {this.queryGoogle()} */}
                </div>
        } else {
            data =
                <div className="loadingloc">
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

export default LocationHelper;
