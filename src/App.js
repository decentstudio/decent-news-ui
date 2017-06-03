import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.newsRetrievalWorker = new SharedWorker(`${process.env.PUBLIC_URL}/news-retrieval-worker.js`);

    this.state = {
      messages: []
    };

    this.newsRetrievalWorker.port.onmessage = (event) => {
      console.log(event.data);
      this.setState({
        messages: [event.data, ...this.state.messages]
      });
    };
    // test http request before moving it to worker since can't console log from worker
    const newsUrl = 'http://localhost:8081/api/news';
    const httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', newsUrl, true);
    httpRequest.onload = (event) => {
      console.log('Ready state:', httpRequest.readyState);
      console.log('Status', httpRequest.statusText);
      console.log('Response text:', httpRequest.responseText);
    };
    httpRequest.send();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div>Web worker output:</div>
        <ul>
          {this.state.messages.map(message => <li key={message}>{message}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
