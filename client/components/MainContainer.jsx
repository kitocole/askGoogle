import React, { Component } from 'react';
import QueryBox from './QueryBox.jsx';
import QueriesList from './QueriesList.jsx';
import HistoryList from './HistoryList.jsx';
// import { connect } from 'react-redux';

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queryList: [],
      histList: [],
      history: false
    }
    this.addQuery = this.addQuery.bind(this);
    this.saveQuery = this.saveQuery.bind(this);
    this.deleteQuery = this.deleteQuery.bind(this);
    this.getQueries = this.getQueries.bind(this);
    this.showHistory = this.showHistory.bind(this);
    this.deleteHistory = this.deleteHistory.bind(this);
    this.hideHistory = this.hideHistory.bind(this);
    this.restoreHistory = this.restoreHistory.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  addQuery(query,lang) {
    console.log('starting add query');
    if(query === '' || lang === '') return;
    this.saveQuery(query, lang);

  }

  saveQuery(question, language) {
    console.log('starting save query');
    if (question === '') return;
    else {
      // console.log('beginning post req with:', query)
      const body = {
        question,
        language
      }
      fetch('/api/newQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      }).then(response => this.getQueries())

        .catch(err => console.log("Save Query FAILED with ERR:", err));
    }
  }

  deleteQuery(question, language, generatedQuery) {
    console.log('starting delete query');
    const body = {question, language, generatedQuery};
    fetch('/api/deleteQuery', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    }).then(response => response)
      .then(data => this.getQueries());
  }

  componentDidMount() {
    this.getQueries();
  }

  getQueries() {
    console.log('running get queries');
    const queryArr = [];
    fetch('/api/getQueries').then(response => response.json())
    .then((data) => {
      // console.log('data: ', data);
      for(let i = 0; i < data.length; i++){
        queryArr.push({
          query: data[i].question, 
          language: data[i].language, 
          combined: data[i].generatedQuery,
          results: data[i].results
        });
      }
    })
    .then( () => {
      this.setState({...this.state, queryList: queryArr});
    })
    .catch(err => console.log('failed in component did mount', err));
  }

  hideHistory() {
    return this.setState({...this.state, histList: [], history: false});
  };

  showHistory(change = false) {
    if(change && this.state.history) {
      this.hideHistory();
      return;
    }
    else{
      fetch('/api/getHistory').then(response => response.json())
      .then(data => {
        // console.log(data);
        const histArr = [];
        for(let i = 0; i < data.length; i++){
          histArr.push({
            query: data[i].question, 
            language: data[i].language,
            combined: data[i].generatedQuery,
            results: data[i].results
          });
        }
        // console.log(histArr);
        return this.setState({...this.state, histList: histArr, history: true});
      })
      .catch(err => console.log('failed in component did mount', err));
    }

  };

  deleteHistory(question, language) {
    const body = {question, language};
    fetch('/api/deleteHistory', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    }).then(response => response)
      .then(data => this.showHistory());
  };

  restoreHistory(question, language, combined) {
    const body = {question, language, combined};
    fetch('/api/restoreQuery', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    }).then((data) => {
      this.showHistory();
      this.getQueries();
    })
  };

  getResults(question, language, combined, index) {
    const arr = [...this.state.queryList];
    console.log(arr[index]);
    const body = {question, language, combined}
    fetch('/api/bing/', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    })
    .then(results => results.json())
    .then((data) => {
      // arr[index].results = data;
      // console.log(data);
      this.getQueries();
      
    })
    return;
  }


  render() {
    return(
      <div className="container">
        <div className="outerBox">
          { /* Start adding components here... */ }
          <QueryBox handleClick={this.addQuery} showHist={this.showHistory} />
          <div className="lists">
            <div className="queryList">
              <QueriesList 
              getResults={this.getResults} 
              queryList={this.state.queryList} 
              deleteQuery={this.deleteQuery}
              />
            </div>
            <div className="histList">
              <HistoryList 
              histList={this.state.histList} 
              restoreHist={this.restoreHistory} 
              deleteHist={this.deleteHistory} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
}


export default MainContainer;