import React from "react";
import ReactDOM from "react-dom";
import GeoMap from "./GeoMap";
import LocalWeather from "./LocalWeather";
import "./index.css";

class App extends React.Component {
  state = { lat: null, lon: null, errorMessage: "" };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      position =>
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }),
      err => this.setState({ errorMessage: err.message })
    );
  }

  renderContent() {
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    if (!this.state.errorMessage && this.state.lat) {
      return (
        <div className="title">
          <h3 className="ui center aligned header">Local Weather</h3>
          <div className="ui two column stackable grid container">
            <LocalWeather lat={this.state.lat} lon={this.state.lon} />
            <GeoMap lat={this.state.lat} lon={this.state.lon} />
          </div>
        </div>
      );
    }

    return <h2>Please accept location request</h2>;
  }

  render() {
    return <div className="border red">{this.renderContent()}</div>;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
