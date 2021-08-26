import React, { useState, Component } from 'react';
import History from './History.jsx';

const HistoryList = props => {
  const newArr = [];
  for(let i = 0; i < props.histList.length; i++){
    newArr.push(<History deleteHist={props.deleteHist} restoreHist={(query, lang) => {props.restoreHist(query, lang)}} question={props.histList[i].query} language={props.histList[i].language}/>);
  }
  return(
    <ul>
      {newArr}
    </ul>
  )
};

export default HistoryList;