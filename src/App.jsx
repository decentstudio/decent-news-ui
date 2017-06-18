import React, { Component } from 'react';
import { OrderedSet } from 'immutable';
import { Button } from 'semantic-ui-react';

class App extends Component {

  constructor() {
    super();

    this.state = {
      newsItems: OrderedSet()
    };

    // this.newsRetrievalWorker = new SharedWorker(`${process.env.PUBLIC_URL}/news-retrieval-worker.js`);
    // this.newsRetrievalWorker.port.onmessage = this.handleNewsWorkerMessage.bind(this);
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
        <div>
          <Button primary>
            Click Here
          </Button>
        </div>
    );
  }
}

export default App;
