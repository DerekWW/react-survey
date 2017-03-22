import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { checkAuth, load } from './helpers/spreadsheet';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      authenticated: false,
      data: '',
    }

    this.onLoad = this.onLoad.bind(this)
  }

  componentDidMount() {
    window.gapi.load('client', () => {
      checkAuth(true, this.handleAuth.bind(this));
    });
  }

  /**
   * Check user authenification status and set app state accordingly
   */
  handleAuth(authResult) {
    if (authResult && !authResult.error) {
      this.setState({
        authenticated: true
      });
      load(this.onLoad)
    } else {
      this.setState({
        authenticated: false
      })
    }
  }

  onLoad(data, error) {
    if (data) {
      const random = data;
      console.log(random);
      this.setState({
        ...data
      });
    }
    else {
      this.setState({
        error: error
      })
    }
  }

  authenticate(e) {
  e.preventDefault();
  checkAuth(false, this.handleAuth.bind(this));
}

  renderContent() {
    const data = this.state.data;

    if (this.state.authenticated === false) {
      return (
        <button onClick={ this.authenticate.bind(this) } className="btn">Connect with Google</button>
      );
    }
    else if (data) {
      return (
        <div className="page">
          YOLO
        </div>
      );
    }
    else if (this.state.error) {
      return (
        <div>
          { this.state.error }
        </div>
      );
    }
    else {
      return (
        <div>
          last else in render content
        </div>
      );
    }
  }


  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        { this.renderContent() }
      </div>
    );
  }
}



export default App;
