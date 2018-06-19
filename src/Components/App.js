import React, { Component } from 'react';
import '../App.css';
import Container from './CardContainer';
import LogoutButton from './LogoutButton';
import { ToastContainer } from 'react-toastify';
import FriendsContainer from './FriendsContainer';
import { fetchUser } from '../actions/user';
import { connect } from 'react-redux';
import PlayerStats from "./CardContainer/PlayerStats";
import TotalWinsChart from '../Components/Charts/TotalWinsChart'
import LoginButton from "./LoginButton/index";
import Profile from "./Profile";


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

      console.log(this.props.user)
      return (
        <div className="App">
          <ToastContainer toastClassName="toast" closeOnClick/>
          <header style={{
            height: '10%',
            display: 'flex',
            justifyContent: 'space-between',
            backgroundColor: '#222',
            alignItems: 'center',
            padding: '0 10px'
          }}>
            <h1 style={{color: 'white'}}>STEAM STATS FRIENDS</h1>
            {this.props.user.user ?
              <div style={{display: 'flex'}}>
                <Profile />
                <LogoutButton />
              </div>
              :<div/>
            }
          </header>
          <br />
          {
              this.props.user.user ?
                <div>
                  <PlayerStats />
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '25% 75%'
                  }}>
                    <div
                      style={{
                        gridColumn: 1
                      }}>
                      <FriendsContainer />
                    </div>
                    <div
                      style={{
                        gridColumn: 2
                      }}>
                      <TotalWinsChart />
                      <Container />
                    </div>
                  </div>
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
