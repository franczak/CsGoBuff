import React, { Component } from 'react';
import axios from "axios/index";

const style = {
  display: "inline-flex",
  marginBottom: "20px",
  backgroundColor: "#e8e8e8",
  width: 200,
  padding: 5,
  borderRadius: 6,
};

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      nickname: ''
    };
  }

  componentDidMount(){
    this.getFriendDetails()
  }

  getFriendDetails() {
    axios.get(`${process.env.REACT_APP_backend}/details/${this.props.steamid}`, {withCredentials: true}).then((resp) => {
      this.setState({
        avatar: resp.data.response.players[0].avatarmedium,
        nickname: resp.data.response.players[0].personaname
      })
    })
  }


  render() {
    return (<div style={style}><img style={{width: 20, height: 20}} src={this.state.avatar} alt="friend avatar"/><p style={{margin: "0px 0px 0px 5px"}}>{this.state.nickname}</p>
            </div>);
  }
}

export default Friend;
