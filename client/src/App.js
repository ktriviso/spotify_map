import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import Map from './Map'

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
        <Switch>
          <Route exact path='/map/' component={Map} />
          <Route exact path='/spotify-callback/' component={Auth} />
          <Route exact path='/' render={(props) => <LogIn {...props} callLoginApi={this.callLoginApi}/>} />
        </Switch>
      </div>
    );
  }
}

export default App;

const LogIn = (props) => <button onClick={props.callLoginApi}>Log In</button>
class Auth extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const auth_code = this.props.location.search.split('=')[1].replace('&state', '')
    this.sendAuth(auth_code)
  }

  sendAuth = (auth_code) => fetch('/api/auth-code', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              'auth_code': auth_code
          })
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

  render(){
    return (
      <div>auth</div>
    )

  }
}
