import React from "react";
import StarshipRow from "./StarshipRow";
import Api from "../services/Api";
import Utils from '../services/Utils';

class Starships extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      StarshipsArray: [],
      StarshipColumnNames: []
    }
    this.dataStorage = {
      shipColumnNames : null,
      shipColumnNamesFixed : [],
      shipArray: [],
      lastSort: null
    }
    this._sort.bind(this)
  }
  _sort(e) {
    let sortByValue = e.target.getAttribute("value")
    if(this.dataStorage.lastSort === sortByValue) {
      let arrayCopy = [...this.state.StarshipsArray]
      this.setState({ StarshipsArray: arrayCopy.reverse() })
    } else {
      let arrayCopy = [...this.state.StarshipsArray]
      arrayCopy.sort(Utils._compareBy(sortByValue))
      this.setState({ StarshipsArray: arrayCopy })
      this.dataStorage.lastSort = sortByValue
    }
  }
  async _fetchData() {
    try {
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
        this.dataStorage.shipColumnNames = Object.getOwnPropertyNames(response.data.results[0]);
        nextUrl = response.data.next;
        response.data.results.forEach(element => {
          let ship = <StarshipRow key={element.name} ship={element} />;
          this.dataStorage.shipArray.push(ship);
        });
        if (response.data.next === null) {
          nextCheck = false;
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  _generateColumnNames() {
    this.dataStorage.shipColumnNames.slice(0, 13).forEach(element => {
      let column = (
        <td key={element} value={element} onClick={e => this._sort(e)}>
          {element
            .split("_")
            .join(" ")
            .toUpperCase()}
        </td>
      );
      this.dataStorage.shipColumnNamesFixed.push(column);
    });
  }
  _normalizeData() {
    this.dataStorage.shipArray.forEach(element => {
      for (var property in element.props.ship) {
        if(isNaN(element.props.ship[property])) {
          if (
            element.props.ship[property] === "n/a" ||
            element.props.ship[property] === "unknown"
          ) {
            element.props.ship[property] = 0
          }
        } else {
          element.props.ship[property] = parseInt(element.props.ship[property], 10)
        }
        if(typeof element.props.ship[property] !== 'number') {
          element.props.ship[property] = Utils._capitalize(element.props.ship[property])
        }
      }
    });
  }
  _render() {
    this.setState({ StarshipsArray: this.dataStorage.shipArray });
    this.setState({ StarshipColumnNames: this.dataStorage.shipColumnNamesFixed });
  }
  async componentDidMount() {
    try {
      await this._fetchData()
      this._generateColumnNames()
      this._normalizeData()
      this._render()
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div className="container">
        <table>
          <thead>
            <tr className="table-headers">{this.state.StarshipColumnNames}</tr>
          </thead>
          <tbody>{this.state.StarshipsArray}</tbody>
        </table>
      </div>
    );
  }
}

export default Starships;
