import React, { Component } from 'react';
import axios from "axios/index";
import apiServices from "../../apiServices";

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
    apiServices.get(`/steam/details/${this.props.steamid}`).then(resp => {
      this.setState({
        avatar: resp.response.players[0].avatarmedium,
        nickname: resp.response.players[0].personaname
      })
    });
  }


  render() {
    return (
      <div style={style} onClick={this.props.onClick}>
        <img style={{width: 20, height: 20}} src={this.state.avatar} alt="friend avatar"/>
        <p style={{margin: "0px 0px 0px 5px"}}>{this.state.nickname}</p>
      </div>
    );
  }
}

export default Friend;
