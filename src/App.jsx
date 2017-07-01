import React, { Component } from 'react';
import { OrderedSet } from 'immutable';
import './App.css';
import {
  Grid,
  Menu,
  Container
} from 'semantic-ui-react';
import CompanyMenu from './components/CompanyMenu';
import PlatformMenu from './components/PlatformMenu';
import appconfig from './appconfig';

class App extends Component {

  constructor() {
    super();

    this.state = {
      platforms: [],
      activePlatform: '',
      activeCompany: '',
      slackMessages: OrderedSet()
    };

    // Uncommment when ready to handle messages
    // this.newsRetrievalWorker = new SharedWorker(`${process.env.PUBLIC_URL}/news-retrieval-worker.js`);
    // this.newsRetrievalWorker.port.onmessage = this.handleNewsWorkerMessage.bind(this);
    this.handleCompanyClick = this.handleCompanyClick.bind(this);
    this.handlePlatformClick = this.handlePlatformClick.bind(this);
  }

  handleNewsWorkerMessage(event) {
    const newSlackMessages = event.data.filter(item => {
      return !this.state.slackMessages.map(x => x.id).includes(item.id)
    });
    if (newSlackMessages.length > 0) {
      this.setState({
        slackMessages: this.state.slackMessages.concat(newSlackMessages)
      });
    }
  }

  handleCompanyClick(event, data) {
    console.log('selected company:', data.name);
    this.setState({
      platforms: appconfig.companies.get(data.name).platforms,
      activeCompany: data.name
    });
  }

  handlePlatformClick(event, data) {
    console.log('selected platform:', data.name);
    this.setState({
      activePlatform: data.name
    });
  }

  render() {
    console.log('render called');
    return (
      <div>
        <Menu inverted fixed="top">
          <Menu.Item header>Decent News</Menu.Item>
        </Menu>
        <Container className="main">
          <Grid>
            <Grid.Column width={4}>
              <CompanyMenu 
                handleCompanyClick={this.handleCompanyClick}
                activeCompany={this.state.activeCompany}
              />
            </Grid.Column>
            <Grid.Column width={11}>
              <PlatformMenu 
                handlePlatformClick={this.handlePlatformClick} 
                platforms={this.state.platforms}
                activePlatform={this.state.activePlatform}
              />
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default App;
