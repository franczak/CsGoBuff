import React, {Component} from 'react'
import axios from 'axios';
import Friend from './Friend'
import {connect} from "react-redux";
import {addCard, fetchFriends} from "../../actions/cards";

const style = {
  width: 200
}

class FriendsContainer extends Component {

  componentDidMount() {
    this.props.fetchFriends();
  }

  render(){
    return(
      <div style={{width: "30%", display: "inline-grid", float:"left", marginLeft:"30px"}}>
      {this.props.friends.map((friend, i) => (
          <Friend
            steamid={friend.steamid}
            index={i}
            onClick={() => this.props.addCard(friend.steamid)}
          />
      ))}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return ({
    addCard: (steamid) => dispatch(addCard(steamid)),
    fetchFriends: () => dispatch(fetchFriends())
  })
};


const mapStateToProps = ({ cards: { friends } }) => {
  return {
    friends: friends.friends
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsContainer)