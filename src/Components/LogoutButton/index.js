import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/user';

class LogoutButton extends Component {
  render() {
    return (
      <div>
        <button
          style={{
          margin: 5,
          height: 50,
          width: 100,
        }}
          onClick={() => this.props.handleLogout()}
        >Logout
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(logoutUser()),
});

export default connect(null, mapDispatchToProps)(LogoutButton);
