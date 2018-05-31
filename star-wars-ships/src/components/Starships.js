import React from 'react';
import StarshipRow from './StarshipRow';
import Api from '../services/Api';

class Starships extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    // let StarshipList = [
    //   {
    //     key: 1,
    //     name: "Sentinel-class landing craft", 
    //     model: "Sentinel-class landing craft", 
    //     manufacturer: "Sienar Fleet Systems, Cyngus Spaceworks", 
    //     cost_in_credits: "240000", 
    //     length: "38"
    //   }, 
    //   {
    //     key: 0,
    //     name: "Death Star", 
    //     model: "DS-1 Orbital Battle Station", 
    //     manufacturer: "Imperial Department of Military Research, Sienar Fleet Systems", 
    //     cost_in_credits: "1000000000000", 
    //     length: "120000"
    //   }, 
    // ]
    // let StarshipsArray = []
    // StarshipList.forEach(ship => {
    //   let Ship = <StarshipRow key={ship.key} ship={ship}/>
    //   StarshipsArray.push(Ship)
    // })
    // this.state = {Array: StarshipsArray } 

    this.fetchData()
  }

  fetchData() {
    console.log("Hello peuniWorld")
  }

  async componentDidMount(){
    try {
      let shipArray = []
      let shipColumnNames = null
      let shipColumnNamesFixed = [];
      let nextCheck = true
      let nextUrl = null
      // let initialResponse = await Api().get('/api/starships/?format=json&page=1')
      // for (let i = 0; i < array.length; i++) {
      //   const element = array[i];
        
      // }
      while (nextCheck) {
        let fetchUrl;
        if (nextUrl === null) {
          fetchUrl = '/api/starships/?format=json&page=1'
        } else {
          fetchUrl = nextUrl.slice(16, nextUrl.lenght)
        }
        let response = await Api().get(fetchUrl)
        shipColumnNames = Object.getOwnPropertyNames(response.data.results[0])
        nextUrl = response.data.next
        response.data.results.forEach(element => {
          let ship = <StarshipRow key={element.name} ship={element}/>
          shipArray.push(ship)
        });
        if(response.data.next === null) {
          nextCheck = false
        }
      }
      shipColumnNames.slice(0, 13).forEach(element => {
        let column = <td key={element}>{element.split("_").join(" ").toUpperCase()}</td>
        shipColumnNamesFixed.push(column)
      })

      this.setState({StarshipsArray : shipArray})
      this.setState({StarshipColumnNames: shipColumnNamesFixed})
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="container">
        <table>
          <thead>
            <tr>
            {this.state.StarshipColumnNames}
            </tr>
          </thead>
          <tbody>
            {this.state.StarshipsArray}
        </tbody>
        </table>
      </div>
    );
  }
}

export default Starships;
