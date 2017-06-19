import React, { Component } from 'react';
import { OrderedSet } from 'immutable';
import './App.css';
import { Grid } from 'semantic-ui-react';
import CompanyMenu from './components/CompanyMenu';

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
        <div className="site-header-container">
          <h1>Decent News</h1>
        </div>
        <Grid className="news-grid">
          <Grid.Column width={4} className="left-column-container">
            <CompanyMenu />
          </Grid.Column>
          <Grid.Column width={12} className="right-column-container">
            News items for selected company
          </Grid.Column>
        </Grid>
        <footer className="site-footer-container">
          Copyright &copy; {new Date().getFullYear()} Decent Studio
        </footer>
      </div>
    );
  }
}

export default App;
