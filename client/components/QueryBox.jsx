import React, { useState, Component } from 'react';
import fetch from 'node-fetch';

const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};

//Query and Language text box with sumbit button.
const QueryBox = props => {
  const [ query, queryOnChange] = useInput('');
  const [ lang, langOnChange] = useInput('');
  
    return(
      <div>
        <div>
          <label htmlFor="query">Enter question here: </label>
          <input name="query" placeholder="what is a variable" value={query} onChange={queryOnChange}/>
        </div>
        <div>
          <label htmlFor="language">What language?</label>
          <input name="language" placeholder="javascript" value={lang} onChange={langOnChange}/>
        </div>
        <button type="submit" className="btnMain" onClick={() => {props.handleClick(query,lang)}}>Save Query</button>
        <button className="btnSecondary" onClick={props.showHist}>History</button>
      </div> 
    )
}
export default QueryBox;