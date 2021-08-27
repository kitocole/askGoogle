import React, { useState, Component } from 'react';

const Query = props => {
  
  return(
    <div>
      <ul>
        <li>
          <div className="secondary">Query: {props.question} Language: {props.language}</div>
          <div className="primary">Search this: {props.combined} </div>
          <button type="delete" onClick={() => props.deleteQuery(props.question, props.language, props.combined)}> DELETE </button>
        </li>
      </ul>
    </div>
  )
};

export default Query;