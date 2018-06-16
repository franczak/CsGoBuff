import React, { Component, Fragment } from 'react';
import axios from 'axios';
import '../App.css';
import Container from './CardContainer';
import LoginButton from './LoginButton/index';
import { ToastContainer, toast } from 'react-toastify';
import FriendsContainer from './FriendsContainer'
import { fetchUser } from '../actions/user'
import {connect} from "react-redux";

class App extends Component {
    state = {
      showApp: false,
    };

    componentDidMount = () => {
      this.props.checkForUser().then(user => {
        console.log(user)
        if (user) {
          this.setState({ showApp: true });
        }
      })
    };

    render() {
      return (
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
      );
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkForUser: () => {
      return dispatch(fetchUser())
    }
  }
};

export default connect(null, mapDispatchToProps)(App);
