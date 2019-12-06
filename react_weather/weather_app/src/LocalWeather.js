import React from "react";
import moment from "moment";

class LocalWeather extends React.Component {
  state = {
    temp: 0,
    city: "",
    icon: null,
    hourlyTemp: [],
    hourlyDay: [],
    hours: [],
    dates: []
  };

  componentDidMount() {
    let day = [];
    let temp = [];
    const apiKey = "7bf568be902e6b7383dd57a83b294572";
    const url = `https://api.openweathermap.org`;
    const proxy = "https://cors-anywhere.herokuapp.com/";
    const weather = `${proxy}${url}/data/2.5/forecast?lat=${this.props.lat}&lon=${this.props.lon}&units=imperial`;

    fetch(weather, {
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        "x-api-key": apiKey
      })
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        const iconId = data.list[0].weather[0]["icon"];
        for (let i = 0; i < data.list.length; i++) {
          day.push(data.list[i]["dt_txt"]);
          temp.push(data.list[i]["main"]["temp"]);
        }
        this.setState({
          hourlyDay: day,
          hourlyTemp: temp,
          temp: data.list[0].main["temp"],
          city: data.city["name"],
          icon: `${url}/img/w/${iconId}.png`
        });
        let dateTime = this.state.hourlyDay;
        let hour = [];
        let date = [];
        dateTime.forEach(day => {
          date.push(moment(day).format("MM/DD"));
          hour.push(moment(day).format("HH:mm"));
        });
        this.setState({
          hours: hour,
          dates: date
        });
      });
  }

  render() {
    return (
      <div className="column">
        <div className="ui segment">
          <div className="ui items">
            <div className="item">
              <div className="ui tiny image">
                <img src={this.state.icon} alt="Weather Icon" />
              </div>
              <div className="content">
                <div className="header">
                  <h2>Current Temperature</h2>
                </div>
                <div className="description">
                  <h3>City: {this.state.city}</h3>
                </div>
                <div className="description">
                  <h3>Temp: {this.state.temp.toFixed(0)}°F</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="ui center aligned header">
          <h2>5 Day Hourly Forecast</h2>
        </div>
        <div className="ui container">
          <table className="ui celled table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Temperature</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="content">
                  {this.state.dates.map((date, i) => {
                    return <h4 key={i}>{date}</h4>;
                  })}
                </td>
                <td className="content">
                  {this.state.hours.map((time, i) => {
                    time.toLocaleString("en-US", {
                      hour: "numeric",
                      hour12: true
                    });
                    return <h4 key={i}>{time}</h4>;
                  })}
                </td>
                <td className="content">
                  {this.state.hourlyTemp.map((val, i) => {
                    return <h4 key={i}>{val.toFixed(0)} °F</h4>;
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default LocalWeather;
