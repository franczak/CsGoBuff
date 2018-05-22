import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Components/CardContainer';
import LoginButton from "./Components/LoginButton/index";
import axios from 'axios'

class App extends Component {

  state = {
    showApp: false
  };

  componentDidMount = () => {
    axios.get('https://cs-go-buff.herokuapp.com/user', {withCredentials: true}).then(res => {
      console.log(res)
      if(!!res.data) {
          this.setState({showApp: true})
      }
    })
  };

  render() {
    return <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <br/>
        {
          this.state.showApp?
              <Container/>
              :
              <LoginButton />
        }
      </div>

  }
}

export default App;
