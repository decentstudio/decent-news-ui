import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import SlackMessage from './components/SlackMessage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { OrderedSet } from 'immutable';

// Needed for onTouchTap 
// http://stackoverflow.com/a/34015469/988941 
injectTapEventPlugin();

class App extends Component {

  constructor() {
    super();

    this.newsRetrievalWorker = new SharedWorker(`${process.env.PUBLIC_URL}/news-retrieval-worker.js`);

    this.state = {
      newsItems: OrderedSet()
    };

    this.newsRetrievalWorker.port.onmessage = this.handleNewsWorkerMessage.bind(this);
  }

  handleNewsWorkerMessage(event) {
    const newNewsItems = event.data.filter(item => {
      return !this.state.newsItems.map(x => x.id).includes(item.id)
    });
    if (newNewsItems.length > 0) {
      this.setState({
        newsItems: this.state.newsItems.concat(newNewsItems)
      });
    }
  }

  render() {
    console.log('render called');
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title="Decent News"
            showMenuIconButton={false}
          />
          {this.state.newsItems.map(message => {
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
