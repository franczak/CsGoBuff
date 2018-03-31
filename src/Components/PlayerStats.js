import React, {Component} from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';


class PlayerStats extends Component {
    state = {
        isClicked: false,
        steamID: ''
    };

    handleSubmit = (e) => {

        e.preventDefault();
        let player = {steamID:'',nickname:'',avatar:'',totalKills:'',totalDeaths:'',totalTime:'',totalMatches:'',totalWins:'',totalMvps:''};
        axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=FD560E373D2C77AAB1E0044788A18A64&steamids=${this.state.steamID}`).then(resp => {
            player.steamID = resp.data.response.players[0].steamid;
            player.nickname = resp.data.response.players[0].personaname;
            player.avatar = resp.data.response.players[0].avatarmedium;
            axios.get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=FD560E373D2C77AAB1E0044788A18A64&steamid=${this.state.steamID}`).then(resp => {
                for (let i = 0; i < resp.data.playerstats.stats.length; i++) {
                    switch (resp.data.playerstats.stats[i].name) {
                        case "total_kills":
                            player.totalKills = resp.data.playerstats.stats[i].value;
                            break;
                        case "total_deaths":
                            player.totalDeaths = resp.data.playerstats.stats[i].value;
                            break;
                        case "total_time_played":
                            player.totalTime = resp.data.playerstats.stats[i].value;
                            break;
                        case "total_matches_played":
                            player.totalMatches = resp.data.playerstats.stats[i].value;
                            break;
                        case "total_wins":
                            player.totalWins = resp.data.playerstats.stats[i].value;
                            break;
                        case "total_mvps":
                            player.totalMvps = resp.data.playerstats.stats[i].value;
                            break;
                        default:
                            break;
                    }
                }
                this.props.onSubmit(player);
                this.setState({steamID: ''});
            });
        })
    };



    render() {
        return (
            <div className="col-2">
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                           value={this.state.steamID}
                           onChange={(e) => this.setState({steamID: e.target.value})}
                           placeholder="Player steamid" required/>
                    <Button color="primary" type="submit">Check player</Button>
                </form>
            </div>
        );
    }
}

export default PlayerStats;
