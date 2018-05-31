import React from 'react';

class StarshipRow extends React.Component {
  render() {
    return <tr>
    <td>
      {this.props.ship.name}
    </td>
    <td>
      {this.props.ship.model}
    </td>
    <td>
      {this.props.ship.manufacturer}
    </td> 
    <td>
      {this.props.ship.cost_in_credits}
    </td> 
    <td>
      {this.props.ship.length}
    </td> 
    <td>
      {this.props.ship.max_atmosphering_speed}
    </td> 
    <td>
      {this.props.ship.crew}
    </td> 
    <td>
      {this.props.ship.passengers}
    </td> 
    <td>
      {this.props.ship.cargo_capacity}
    </td> 
    <td>
      {this.props.ship.consumables}
    </td> 
    <td>
      {this.props.ship.hyperdrive_rating}
    </td> 
    <td>
      {this.props.ship.MGLT}
    </td> 
    <td>
      {this.props.ship.starship_class}
    </td> 
  </tr>
  }
}

export default StarshipRow