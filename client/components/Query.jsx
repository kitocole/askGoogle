import React, { useState, Component } from 'react';

const Query = props => {
  
  return(
    <div>
      <ul>
        <li>
          <div>Query: {props.question}</div>
          <div>Language: {props.language}</div>
          <button type="delete" onClick={() => props.deleteQuery(props.question, props.language)}> DELETE </button>
        </li>
      </ul>
    </div>
  )
};

export default Query;