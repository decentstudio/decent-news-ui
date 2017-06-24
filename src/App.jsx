import React, { Component } from 'react';
import { OrderedSet } from 'immutable';
import './App.css';
import {
  Grid,
  Menu,
  Segment,
  Container
} from 'semantic-ui-react';
import CompanyMenu from './components/CompanyMenu';
import appconfig from './appconfig';

class App extends Component {

  constructor() {
    super();

    this.state = {
      newsItems: OrderedSet()
    };

    // this.newsRetrievalWorker = new SharedWorker(`${process.env.PUBLIC_URL}/news-retrieval-worker.js`);
    // this.newsRetrievalWorker.port.onmessage = this.handleNewsWorkerMessage.bind(this);
    this.handleCompanyClick = this.handleCompanyClick.bind(this);
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

  handleCompanyClick() {
    alert('Clicked a company');
  }

  render() {
    console.log('render called');
    return (
      <div>
        <Menu inverted fixed="top">
          <Menu.Item header>Decent Studio</Menu.Item>
        </Menu>
        <Container className="main">
          <Menu vertical>
            {appconfig.companies.map(company => {
              return <Menu.Item onClick={this.handleCompanyClick}>{company.name}</Menu.Item>;
            })}
          </Menu>
        </Container>
      </div>
    );
  }
}

export default App;
