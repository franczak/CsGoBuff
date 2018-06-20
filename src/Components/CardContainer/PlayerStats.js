import React, { Component } from 'react';
import { connect } from 'react-redux';
import apiServices from '../../apiServices';
import { addCard } from '../../actions/cards';


class PlayerStats extends Component {
    state = {
      steamID: '',
    };

    handleSubmit = (e) => {
      e.preventDefault();

      this.props.addCard(this.state.steamID)
        .then(() => {
          apiServices.post('/user/friend', { steamid: this.state.steamID });
          this.setState({ steamID: '' });
        })
        .catch(() => {
          this.setState({ steamID: '' });
        });
    };


    render() {
      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
        >
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              style={{ height: 30, width: 300, marginRight: 5 }}
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


const mapDispatchToProps = dispatch => ({
  addCard: steamid => dispatch(addCard(steamid)),
});

export default connect(null, mapDispatchToProps)(PlayerStats);
