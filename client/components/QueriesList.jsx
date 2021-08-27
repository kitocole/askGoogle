import React, { useState, Component } from 'react';
import Query from './Query.jsx';

const QueriesList = props => {
  // console.log(props.queryList[0]);
  const newArr = [];
  for(let i = 0; i < props.queryList.length; i++){
    // console.log(props.queryList[i]);
    newArr.push(<Query 
      deleteQuery={props.deleteQuery} 
      combined={props.queryList[i].combined} 
      question={props.queryList[i].query} 
      language={props.queryList[i].language}
      results={props.queryList[i].results}
      getResults={props.getResults}
      identity = {i}
      />);
  }
  return(
    <ul>
      {newArr}
    </ul>
  )
};

export default QueriesList;