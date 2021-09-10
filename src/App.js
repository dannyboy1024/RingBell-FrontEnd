import React, { Component } from "react";
import Listeners from './Listeners'


class App extends Component {
  state = {
    loading: true,
    listeners: []
  }
  
  async componentDidMount() {
    const url = 'https://ringbell-api.herokuapp.com/api/v1/listeners'
    const resp = await fetch(url)
    const data = await resp.json()
    const persons = data.data
    this.setState({
       listeners : persons
    })
  }

  render() {
    return (
      <Listeners listeners={this.state.listeners}/>
    );
  }
}

export default App;
