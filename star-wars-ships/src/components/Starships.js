import React from "react";
import StarshipRow from "./StarshipRow";
import Api from "../services/Api";

class Starships extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StarshipsArray: [],
      StarshipColumnNames: []
    };
    this._compareBy.bind(this);
    this._sort.bind(this);
  }
  _sort(e) {
    let sortByValue = e.target.getAttribute("value");
    let arrayCopy = [...this.state.StarshipsArray];
    arrayCopy.sort(this._compareBy(sortByValue));
    this.setState({ StarshipsArray: arrayCopy });
  }
  _compareBy(value) {
    return function(a, b) {
      if (a.props.ship[value] < b.props.ship[value]) return -1;
      if (a.props.ship[value] > b.props.ship[value]) return 1;
      return 0;
    };
  }
  async componentDidMount() {
    // Fetch and pass data down to table component
    try {
      // Initiating some vars
      let shipArray = [];
      let shipColumnNames = null;
      let shipColumnNamesFixed = [];
      let nextCheck = true;
      let nextUrl = null;
      //Looping calls to resource
      while (nextCheck) {
        let fetchUrl;
        if (nextUrl === null) {
          fetchUrl = "/api/starships/?format=json&page=1";
        } else {
          fetchUrl = nextUrl.slice(16, nextUrl.lenght);
        }
        let response = await Api().get(fetchUrl);
        shipColumnNames = Object.getOwnPropertyNames(response.data.results[0]);
        nextUrl = response.data.next;
        response.data.results.forEach(element => {
          let ship = <StarshipRow key={element.name} ship={element} />;
          shipArray.push(ship);
        });
        if (response.data.next === null) {
          nextCheck = false;
        }
      }
      // Generating array with table names
      shipColumnNames.slice(0, 13).forEach(element => {
        let column = (
          <td key={element} value={element} onClick={e => this._sort(e)}>
            {element
              .split("_")
              .join(" ")
              .toUpperCase()}
          </td>
        );
        shipColumnNamesFixed.push(column);
      });
      //Normalize data
      shipArray.forEach(element => {
        for (var property in element.props.ship) {
          if (element.props.ship.hasOwnProperty(property)) {
            if (
              element.props.ship[property] === "n/a" ||
              element.props.ship[property] === "unknown"
            ) {
              element.props.ship[property] = "0";
            }
          }
        }
      });
      // Render state
      await this.setState({ StarshipsArray: shipArray });
      await this.setState({ StarshipColumnNames: shipColumnNamesFixed });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    return (
      <div className="container">
        <table>
          <thead>
            <tr>{this.state.StarshipColumnNames}</tr>
          </thead>
          <tbody>{this.state.StarshipsArray}</tbody>
        </table>
      </div>
    );
  }
}

export default Starships;
