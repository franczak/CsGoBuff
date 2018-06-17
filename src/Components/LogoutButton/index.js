import React, { Component } from 'react';
import {connect} from "react-redux"
import {logoutUser} from '../../actions/user';

class LogoutButton extends Component {

  render() {
    return (
      <div>
        <button onClick={() => this.props.handleLogout()}>Logout</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    handleLogout: () =>{
      dispatch(logoutUser());
    },
  }
}

export default connect(null, mapDispatchToProps)(LogoutButton);
