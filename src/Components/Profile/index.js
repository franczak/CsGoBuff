import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addCard} from "../../actions/cards";

class Profile extends Component {
  render() {
    return (<div style={{display: 'flex'}}>
      <img src={this.props.user.user.avatar.medium} height={50} style={{margin: '5px', cursor:'pointer'}} onClick={()=>this.props.addCard(this.props.user.user.steamid)} alt="User avatar"/>
        <a href={this.props.user.user.profile} style={{margin: '20px 10px', color: 'white', textDecoration: 'none'}}>{this.props.user.user.username}</a>
      </div>);
  }
}


const mapDispatchToProps = dispatch => ({
  addCard: steamid => dispatch(addCard(steamid))
})

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
