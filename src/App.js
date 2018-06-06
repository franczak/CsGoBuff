import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Components/CardContainer';
import LoginButton from "./Components/LoginButton/index";
import axios from 'axios'

const server = 'https://cs-go-buff.herokuapp.com'
    //https://cs-go-buff.herokuapp.com
class App extends Component {

  state = {
    showApp: false
  };

  componentDidMount = () => {
    axios.get(server + "/user", {withCredentials: true}).then(res => {
      console.log(res)
      if(!!res.data) {
          this.setState({showApp: true})
      }
    })
  };

  render() {
    return <div className="App">
        <header className="App-header">
          <h1 className="App-title">STEAM STATS FRIENDS</h1>
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
