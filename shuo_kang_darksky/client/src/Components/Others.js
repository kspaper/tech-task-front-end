import React, { Component } from 'react';

class Others extends Component {
    render() {
        return (
            <div className="right-container__contents">

                <p>Precipitation: {this.props.precipitation} % </p>
                <p>Humidity: {this.props.humidity} % </p>
                <p>Wind: {this.props.wind} km/h </p>
                <div className="right-container__buttons">
                    <button className="btn">Temperature</button>
                    <button className="btn">Precipitation</button>
                    <button className="btn">Wind</button>
                </div>

            </div>
        );
    }
}

export default Others;