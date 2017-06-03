import React, { Component } from 'react';
import SlackMessage from './components/SlackMessage';

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
        messages: [...this.state.messages, event.data]
      });
    };
    // test http request before moving it to worker since can't console log from worker
    // const newsUrl = 'http://localhost:8081/api/news';
    // const httpRequest = new XMLHttpRequest();
    // httpRequest.open('GET', newsUrl, true);
    // httpRequest.onload = (event) => {
    //   console.log('Ready state:', httpRequest.readyState);
    //   console.log('Status', httpRequest.statusText);
    //   console.log('Response text:', httpRequest.responseText);
    // };
    // httpRequest.send();
  }

  render() {
    return (
      <SlackMessage />
    );
  }
}

export default App;
