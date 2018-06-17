import React, { Component } from 'react';
import '../App.css';
import Container from './CardContainer';
import LoginButton from './LoginButton/index';
import LogoutButton from './LogoutButton';
import { ToastContainer } from 'react-toastify';
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
              this.props.user.user ?
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
