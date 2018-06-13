import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class PlayerStats extends Component {
    static propTypes = {
      onSubmit: PropTypes.func.isRequired,
    };

    state = {
      steamID: '',
    };

    handleSubmit = (e) => {
      e.preventDefault();
      const player = {
        steamID: '', nickname: '', avatar: '', totalKills: '', totalDeaths: '', totalTime: '', totalMatches: '', totalWins: '', totalMvps: '',
      };
      axios.get(`${process.env.REACT_APP}/details/${this.state.steamID}`, { withCredentials: true }).then((resp) => {
        player.steamID = resp.data.response.players[0].steamid;
        player.nickname = resp.data.response.players[0].personaname;
        player.avatar = resp.data.response.players[0].avatarmedium;
        axios.get(`${process.env.REACT_APP_backend}/stats/${this.state.steamID}`, { withCredentials: true }).then((stats) => {
          for (let i = 0; i < stats.data.playerstats.stats.length; i += 1) {
            switch (stats.data.playerstats.stats[i].name) {
              case 'total_kills':
                player.totalKills = stats.data.playerstats.stats[i].value;
                break;
              case 'total_deaths':
                player.totalDeaths = stats.data.playerstats.stats[i].value;
                break;
              case 'total_time_played':
                player.totalTime = stats.data.playerstats.stats[i].value;
                break;
              case 'total_matches_played':
                player.totalMatches = stats.data.playerstats.stats[i].value;
                break;
              case 'total_wins':
                player.totalWins = stats.data.playerstats.stats[i].value;
                break;
              case 'total_mvps':
                player.totalMvps = stats.data.playerstats.stats[i].value;
                break;
              default:
                break;
            }
          }
          this.props.onSubmit(player);
          this.setState({ steamID: '' });
        });
      });
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
