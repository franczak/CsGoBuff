import React, {Component} from 'react';
import apiServices from '../../apiServices';


class Stats extends Component {
  state = {}

  componentWillMount() {
    this.getPlayerStats();
  }

  getPlayerStats() {
    apiServices.get(`/steam/favourites/${this.props.steamid}`).then(resp => {
      this.setState({
        ...resp.data
      })
    })
  }

  render() {
    return (
      <div>
        <div style={{textAlign: 'center'}}>
          <h2>Player details statistics</h2>
        </div>
        <div style={{display: "flex", flexFlow: "row wrap", lineHeight: '3'}}>
          <div style={{flex: "1"}}>
            <span className="stat-name">Player K/D ratio is:</span><span className="stat-value"> {this.state.kd}</span>
            <br/><span className="stat-name">Player accuracy %:</span><span className="stat-value">{this.state.accuracy}</span>
            <br/><span className="stat-name">Player HS %:</span><span className="stat-value">{this.state.hs}</span>
          <br/><span className="stat-name">Player win %:</span><span className="stat-value">{this.state.winRatio}</span>
        <br/><span className="stat-name">Player total kills:</span><span className="stat-value">{this.state.totalKills}</span>
          </div>
          <div style={{flex: "1"}}>
            <span className="stat-name">de_cbble rounds:</span><span className="stat-value"> {this.state.cbble}</span>
            <br/><span className="stat-name">de_dust rounds:</span><span className="stat-value"> {this.state.dust}</span>
            <br/><span className="stat-name">de_dust2 rounds:</span><span className="stat-value"> {this.state.dust2}</span>
            <br/><span className="stat-name">de_inferno rounds:</span><span className="stat-value"> {this.state.inferno}</span>
            <br/><span className="stat-name">de_nuke rounds:</span><span className="stat-value"> {this.state.nuke}</span>
          </div>
          <div style={{flex: "1"}}>
            <span className="stat-name">M4a1 kills:</span><span className="stat-value"> {this.state.m4a1}</span>
            <br/><span className="stat-name">AK-47 kills:</span><span className="stat-value"> {this.state.ak47}</span>
            <br/><span className="stat-name">AWP kills:</span><span className="stat-value"> {this.state.awp}</span>
            <br/><span className="stat-name">SSG08 kills:</span><span className="stat-value"> {this.state.ssg08}</span>
            <br/><span className="stat-name">P90 kills:</span><span className="stat-value"> {this.state.p90}</span>
          </div>
        </div>
      </div>

    )
  }
}

export default Stats;