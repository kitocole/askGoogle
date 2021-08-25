import React, { Component } from 'react';
import MainContainer from './MainContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    // this.handleClick = this.handleClick.bind(this);
    // this.state = getInitialState();
  }

  render() {
    return(
    <div>
      <MainContainer/>
    </div>
    )
  }
}

export default App;