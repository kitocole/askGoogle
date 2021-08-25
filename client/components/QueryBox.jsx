import React, { useState, Component } from 'react';

const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};

const QueryBox = props => {
  const [ query, queryOnChange] = useInput('');

  const saveQuery = () => {
    if (query === '') return;
    else {
      console.log(query)
      return;
    }
  }
  
    return(
      <div>
        <label htmlFor="query">Enter question here: </label>
        <input name="query" placeholder="what is a variable" value={query} onChange={queryOnChange}/>
        <button type="submit" className="btnMain" onClick={saveQuery}>Click pls</button>
      </div> 
    )
}
export default QueryBox;