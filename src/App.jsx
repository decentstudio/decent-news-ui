import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SlackMessage from './components/SlackMessage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

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
        messages: [...this.state.messages, ...event.data]
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
      <MuiThemeProvider>
        <div>
          <AppBar 
            title="Decent News"
            showMenuIconButton={false}
          />
          {this.state.messages.map(message => {
            return (
              <SlackMessage
                key={message.id}
                message={message} />
            );
          })}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
