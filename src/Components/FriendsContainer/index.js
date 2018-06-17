import React, { Component } from 'react';
import Friend from './Friend';
import './style.css'
import { connect } from 'react-redux';
import { addCard, fetchFriends } from '../../actions/cards';


class FriendsContainer extends Component {
  componentDidMount() {
    this.props.fetchFriends();
  }

  render() {
    return (
      <div className="friends-container">
        {this.props.friends.map((friend, i) => (
          <Friend
            steamid={friend.steamid}
            index={i}
            key={friend.steamid}
            onClick={() => this.props.addCard(friend.steamid)}
          />
      ))}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCard: steamid => dispatch(addCard(steamid)),
  fetchFriends: () => dispatch(fetchFriends()),
});


const mapStateToProps = ({ cards: { friends } }) => ({
  friends: friends.friends,
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer);
