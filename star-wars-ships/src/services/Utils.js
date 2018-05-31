export default {
  _capitalize: function(string) {
    if(string[0] === undefined) {
      return string
    } else {
      return string[0].toUpperCase() + string.slice(1, string.length)
    }  
  },
  _compareBy(value) {
    return function(a, b) {
      if (a.props.ship[value] < b.props.ship[value]) return -1;
      if (a.props.ship[value] > b.props.ship[value]) return 1;
      return 0;
    }
  }
}