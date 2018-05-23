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
        axios.get(`https://cs-go-buff.herokuapp.com/${this.state.steamID}`,{withCredentials: true}).then(resp => {
            player.steamID = resp.data.response.players[0].steamid;
            player.nickname = resp.data.response.players[0].personaname;
            player.avatar = resp.data.response.players[0].avatarmedium;
            axios.get(`https://cs-go-buff.herokuapp.com/stats/${this.state.steamID}`, {withCredentials: true}).then(resp => {
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
            <div className="col">
                <form onSubmit={this.handleSubmit}>
                    <input type="text"
                           style={{height:30 , width: 300}}
                           value={this.state.steamID}
                           onChange={(e) => this.setState({steamID: e.target.value})}
                           placeholder="Player steamid" required/>
                         <Button color="danger" type="submit" style={{height: 30, marginBottom: 5, paddingTop: 2}}>Add</Button>
                </form>
            </div>
        );
    }
}

export default PlayerStats;
