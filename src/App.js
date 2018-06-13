import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Container from './Components/CardContainer';
import LoginButton from './Components/LoginButton/index';

class App extends Component {
    state = {
      showApp: false,
    };

    componentDidMount = () => {
      axios.get(`${process.env.REACT_APP_backend}/user`, { withCredentials: true }).then((res) => {
        if (res.data) {
          this.setState({ showApp: true });
        }
      });
    };

    render() {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">STEAM STATS FRIENDS</h1>
          </header>
          <br />
          {
                    this.state.showApp ?
                      <Container />
                        :
                      <LoginButton />
                }
        </div>);
    }
}

export default App;
