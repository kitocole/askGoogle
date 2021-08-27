import React, { useState, Component } from 'react';

const Query = props => {
  let results = [];
  // console.log("wegot here", props.results)
    for(let i=0; i < props.results.length; i++){
      results.push(<li>{props.results[i]}</li>)
      // console.log('got here', props.results[i]);
    }
  return(
    <div>
      <ul>
        <li>
          <div className="secondary">Query: {props.question} </div>
          <div> Language: {props.language}</div>
          <div className="primary">Search this: {props.combined} </div>
          <ul>
            Results:
            {results}
          </ul>
          <span>
            <button type="delete" onClick={() => props.deleteQuery(props.question, props.language, props.combined)}> DELETE </button>
            <button type="results" onClick={() => props.getResults(props.question, props.language, props.combined, props.identity)}> Search </button>
          </span>
        </li>
      </ul>
    </div>
  )
};

export default Query;