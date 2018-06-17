import React, { Component, Fragment } from 'react';
import axios from 'axios';
import '../App.css';
import Container from './CardContainer';
import LoginButton from './LoginButton/index';
import LogoutButton from './LogoutButton';
import { ToastContainer, toast } from 'react-toastify';
import FriendsContainer from './FriendsContainer';
import { fetchUser } from '../actions/user';
import { connect } from 'react-redux';

class App extends Component {
    state = {
      showApp: false,
    };

    componentDidMount = () => {
      this.props.checkForUser().then((user) => {
        if (user) {
          this.setState({ showApp: true });
        }
      });
    };

    render() {
      return (
        <div className="App">
          <ToastContainer toastClassName="toast" />
          <header className="App-header">
            <h1 className="App-title">STEAM STATS FRIENDS</h1>
          </header>
          <br />
          {
              this.state.showApp ?
                <div>
                  <FriendsContainer />
                  <Container />
                  <LogoutButton />
                </div>
                :
                <LoginButton/>
            }
        </div>
      );
    }
}

const mapDispatchToProps = dispatch => ({
  checkForUser: () => dispatch(fetchUser()),
});

const mapStateToProps = ({ user }) => ({
  user,
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
