import React, { Component, Fragment } from 'react';
import Friend from './Friend';
import './style.css'
import { connect } from 'react-redux';
import {addCard, fetchDbFriends, fetchFriends} from '../../actions/cards';


class FriendsContainer extends Component {
  componentDidMount() {
    this.props.fetchFriends();
    this.props.fetchDbFriends()
  }

  state = {
    hidden: true
  };
  render() {
    return (
      <Fragment>
        <div style={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <h1 onClick={() => this.setState({hidden: true})} style={{
            cursor: 'pointer'
          }}>
            Steam friends
          </h1>
          <div className={"friends-container " + (!this.state.hidden && 'hidden')}>
            {this.props.friends.map((friend, i) => (
              <Friend
                steamid={friend.steamid}
                index={i}
                key={friend.steamid}
                onClick={() => this.props.addCard(friend.steamid)}
              />
            ))}
          </div>
          <h1 onClick={() => this.setState({hidden: false})} style={{
            cursor: 'pointer'
          }}>
            Recent searches
          </h1>
          <div className={"friends-container " + (this.state.hidden && 'hidden')}>
            {this.props.dBfriends.map((friend, i) => (
              <Friend
                steamid={friend.steamid}
                index={i}
                key={friend.steamid}
                onClick={() => this.props.addCard(friend.steamid)}
              />
            ))}
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCard: steamid => dispatch(addCard(steamid)),
  fetchFriends: () => dispatch(fetchFriends()),
  fetchDbFriends: () => dispatch(fetchDbFriends())
});


const mapStateToProps = ({ cards: { friends, dBfriends } }) => ({
  friends: friends.friends,
  dBfriends: dBfriends.friends
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
