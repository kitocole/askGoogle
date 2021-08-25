import React, { Component } from 'react';
import QueryBox from './QueryBox.jsx';
// import { connect } from 'react-redux';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    return(
      <div className="container">
        <div className="outerBox">
          <h1 id="header">Does this work</h1>
          { /* Start adding components here... */ }
          <QueryBox />
          {/* <button style={{height: '100px', width: '100px'}} >click this</button> */}
        </div>
      </div>
    );
  }

}

export default MainContainer;