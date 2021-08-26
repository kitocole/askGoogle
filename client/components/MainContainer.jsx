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
  }

  addQuery(query,lang) {
    if(query === '' || lang === '') return;
    this.saveQuery(query, lang);
    const newQuery = [...this.state.queryList];
    newQuery.push({query: query, language: lang});
    // console.log(newQuery);
    return this.setState({queryList: newQuery});
  }

  saveQuery(query, lang) {
    if (query === '') return;
    else {
      // console.log('beginning post req with:', query)
      const body = {
        query,
        lang
      }
      fetch('/api/newQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/JSON'
        },
        body: JSON.stringify(body)
      }).then(response => response)
        // .then(data => console.log(data))
        .catch(err => console.log("Save Query FAILED with ERR:", err));
    }
  }

  deleteQuery(question, language) {
    const body = {question, language};
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
    fetch('/api/getQueries').then(response => response.json())
    .then(data => {
      console.log('data: ', data);
      const queryArr = [];
      for(let i = 0; i < data.length; i++){
        queryArr.push({query: data[i].question, language: data[i].language});
      }
      return this.setState({...this.state, queryList: queryArr});
    })
    .catch(err => console.log('failed in component did mount', err));
  }

  hideHistory() {
    return this.setState({...this.state, histList: [], history: false});
  };

  showHistory() {
    if(this.state.history) {
      this.hideHistory();
      return;
    }
    else{
      fetch('/api/getHistory').then(response => response.json())
      .then(data => {
        // console.log(data);
        const histArr = [];
        for(let i = 0; i < data.length; i++){
          histArr.push({query: data[i].question, language: data[i].language});
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

  restoreHistory(question, language) {
    const body = {question, language};
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


  render() {
    return(
      <div className="container">
        <div className="outerBox">
          { /* Start adding components here... */ }
          <QueryBox handleClick={this.addQuery} showHist={this.showHistory} />
          <QueriesList queryList={this.state.queryList} deleteQuery={this.deleteQuery}/>
          <HistoryList histList={this.state.histList} restoreHist={this.restoreHistory} deleteHist={this.deleteHistory} />
          {/* <button style={{height: '100px', width: '100px'}} >click this</button> */}
        </div>
      </div>
    );
  };
}


export default MainContainer;