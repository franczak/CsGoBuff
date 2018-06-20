import React, { Component } from 'react';
import apiServices from '../../apiServices';

const style = {
  display: 'inline-flex',
  marginBottom: '20px',
  width: 200,
  padding: 5,
  borderRadius: 6,
  cursor: 'pointer',
};

class Friend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      nickname: '',
    };
  }

  componentDidMount() {
    this.getFriendDetails();
  }

  getFriendDetails() {
    apiServices.get(`/steam/details/${this.props.steamid}`).then((resp) => {
      this.setState({
        avatar: resp.response.players[0].avatarmedium,
        nickname: resp.response.players[0].personaname,
      });
    });
  }


  render() {
    return (
      <div style={style} onClick={this.props.onClick}>
        <img style={{ width: 50, height: 50 }} src={this.state.avatar} alt="friend avatar" />
        <p style={{ marginLeft: '5px' }}>{this.state.nickname}</p>
      </div>
    );
  }
}

export default Friend;
