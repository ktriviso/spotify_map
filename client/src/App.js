import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  callLoginApi = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/spotify-login')
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      console.log(data)
      window.location = data.url
    })
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.callLoginApi}>Log In</button>
        <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
}

export default App;
