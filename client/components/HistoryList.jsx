import React, { useState, Component } from 'react';
import History from './History.jsx';

const HistoryList = props => {
  const newArr = [];
  // console.log(props);
  for(let i = 0; i < props.histList.length; i++){
    newArr.push(<History 
      deleteHist={props.deleteHist} 
      restoreHist={(query, lang, combined) => {props.restoreHist(query, lang, combined)}} 
      question={props.histList[i].query} 
      language={props.histList[i].language} 
      combined={props.histList[i].combined}
      />);
  }
  return(
    <ul>
      {newArr}
    </ul>
  )
};

export default HistoryList;