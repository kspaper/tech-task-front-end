import React, { Component } from 'react';

class Weather extends Component {
    render() {
        return (
            <div>
                <span className="left-container__subtitle">
                    {this.props.dateAttr}
                </span>
                <br />
                <span className="left-container__subtitle">
                    {this.props.description}
                </span>
                <br />
                <div className="left-container__icon">
                    {this.props.imgSrc}
                </div>
                <div className="left-container__temp">
                    {this.props.temperature}
                    <span className="c__info">°C | </span>
                    <span className="f__info">°F</span>
                </div>
            </div>
        );
    }
}

export default Weather;