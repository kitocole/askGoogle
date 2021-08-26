import React, { useState, Component } from 'react';

const History = props => {
  
  return(
    <div>
      <ul>
        <li>
          <div>Query: {props.question}</div>
          <div>Language: {props.language}</div>
          <span>
            <button type="delete" onClick={() => props.deleteHist(props.question, props.language)}> Delete </button>
            <button type="restore" onClick={() => props.restoreHist(props.question, props.language)}> Restore</button>
          </span>
        </li>
      </ul>
    </div>
  )
};

export default History;