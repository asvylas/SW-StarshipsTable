import React from "react";

class StarshipRow extends React.Component {
  render() {
    let shipArray = this.props.ship;
    return (
      <tr>
        <td>{shipArray.name}</td>
        <td>{shipArray.model}</td>
        <td>{shipArray.manufacturer}</td>
        <td>{shipArray.cost_in_credits}</td>
        <td>{shipArray.length}</td>
        <td>{shipArray.max_atmosphering_speed}</td>
        <td>{shipArray.crew}</td>
        <td>{shipArray.passengers}</td>
        <td>{shipArray.cargo_capacity}</td>
        <td>{shipArray.consumables}</td>
        <td>{shipArray.hyperdrive_rating}</td>
        <td>{shipArray.MGLT}</td>
        <td>{shipArray.starship_class}</td>
      </tr>
    );
  }
}

export default StarshipRow;
