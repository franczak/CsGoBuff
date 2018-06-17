import React, { Component } from 'react';
import PropTypes from 'prop-types';
import apiServices from '../../apiServices'
import {connect} from "react-redux";
import {addCard} from "../../actions/cards";



class PlayerStats extends Component {
    static propTypes = {
      onSubmit: PropTypes.func.isRequired,
    };

    state = {
      steamID: '',
    };

    handleSubmit = (e) => {
      e.preventDefault();

      this.props.addCard(this.state.steamID)
        .then(_ => {
          apiServices.post('/user/friend', {steamid: this.state.steamID})
          this.setState({ steamID: '' })
        })
        .catch(_ => {
          this.setState({ steamID: '' })
        })
    };


    render() {
      return (
        <div className="col" style={{paddingLeft: 30}}>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              style={{ height: 30, width: 300 , marginLeft: "5%"}}
              value={this.state.steamID}
              onChange={e => this.setState({ steamID: e.target.value })}
              placeholder="Player steamid"
              required
            />
            <button color="danger" type="submit" style={{ height: 30, marginBottom: 5, paddingTop: 2 }}>Add</button>
          </form>
        </div>
      );
    }
}


const mapDispatchToProps = (dispatch) => {
  return ({
    addCard: (steamid) => dispatch(addCard(steamid))
  })
}

export default connect(null, mapDispatchToProps)(PlayerStats);
