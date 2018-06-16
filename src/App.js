import React, { Component, Fragment } from 'react';
import axios from 'axios';
import './App.css';
import Container from './Components/CardContainer';
import LoginButton from './Components/LoginButton/index';
import { ToastContainer, toast } from 'react-toastify';
import FriendsContainer from './Components/FriendsContainer'


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
        <Fragment>
          <div className="App">
            <ToastContainer toastClassName={'toast'} />
            <header className="App-header">
              <h1 className="App-title">STEAM STATS FRIENDS</h1>
            </header>
            <br />
            {
              this.state.showApp ?
                <div>
                  <FriendsContainer/>
                  <Container />
                </div>
                :
                <LoginButton />
            }
          </div>
        </Fragment>

      );
    }
}

export default App;
