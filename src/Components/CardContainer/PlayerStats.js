import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import apiServices from '../../apiServices'



const neededStats = [
  'total_kills',
  'total_deaths',
  'total_time_played',
  'total_matches_played',
  'total_wins',
  'total_mvps'
];

class PlayerStats extends Component {
    static propTypes = {
      onSubmit: PropTypes.func.isRequired,
    };

    state = {
      steamID: '',
    };

    handleSubmit = (e) => {
      e.preventDefault();
      let player = {};

      Promise.all([apiServices.get(`/steam/details/${this.state.steamID}`), apiServices.get(`/steam/stats/${this.state.steamID}`)]).then(res => {

        const playerstats = res[1].playerstats;

        player.steamID = res[0].response.players[0].steamid;
        player.nickname = res[0].response.players[0].personaname;
        player.avatar = res[0].response.players[0].avatarmedium;

        const playerStats = playerstats.stats
          .filter(({ name }) => neededStats.includes(name))
          .reduce((prev, nexObj) => {
            return {
              ...prev,
              [nexObj.name]: nexObj.value,
            }
          }, {});


        player = {
          ...player,
          ...playerStats,
        };


        this.props.onSubmit(player)
        this.setState({ steamID: '' })
        /*axios.post(`${process.env.REACT_APP_backend}/user/add`, {
          userId: player.steamID
        })*/
      })

    };


    render() {
      return (
        <div className="col">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              style={{ height: 30, width: 300 }}
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

export default PlayerStats;
