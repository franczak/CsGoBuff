import React, {Component} from 'react'
import axios from 'axios';
import Friend from './Friend'

const style = {
  width: 200
}

class FriendsContainer extends Component{

  render(){
    const friends = {"friendslist":{"friends":[{"steamid":"76561197984290150","relationship":"friend","friend_since":1451901051},{"steamid":"76561197988604340","relationship":"friend","friend_since":1508710228},{"steamid":"76561197997057746","relationship":"friend","friend_since":1473019481},{"steamid":"76561197997955732","relationship":"friend","friend_since":1494881696}]}}
    const friendsArray = friends.friendslist.friends
    return(
      <div style={{width: "30%", display: "inline-grid", float:"left", marginLeft:"30px"}}>
      {friendsArray.map((friend, i) => (
          <Friend
            steamid={friend.steamid}
            index={i}
          />
      ))}
      </div>
    )
  }
}

export default FriendsContainer