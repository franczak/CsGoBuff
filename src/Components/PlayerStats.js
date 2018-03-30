import React, {Component} from 'react';
import axios from 'axios';
import { Button } from 'reactstrap';


class PlayerStats extends Component {
    state = {
        isClicked: false,
        steamID: ''
    };
    //
    // fillState = (data) =>{
    //     let arr = [];
    //     for(let i=0;i<data.length;i++){
    //         switch(data[i].name){
    //             case "total_kills": arr.push(data[i].value); break;
    //             case "total_deaths":arr.push(data[i].value); break;
    //             case "total_time_played": arr.push(data[i].value); break;
    //             case "total_matches_played": arr.push(data[i].value); break;
    //             case "total_wins": arr.push(data[i].value); break;
    //             case "total_mvps": arr.push(data[i].value); break;
    //             default: break;
    //         }
    //     }
    //     return arr;
    // };

    handleSubmit = (e) => {

        e.preventDefault();
        axios.get(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=FD560E373D2C77AAB1E0044788A18A64&steamids=${this.state.steamID}`).then(resp => {
            let player = {steamID:'',nickname:'',avatar:''};
            player.nickname = resp.data.response.players[0].personaname;
            player.avatar = resp.data.response.players[0].avatarmedium;
            // data.push(resp.data.response.players[0].loccountrycode);
            // axios.get(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=FD560E373D2C77AAB1E0044788A18A64&steamid=${this.state.steamID}`).then(resp => {
            //     // this.fillState(resp.data.playerstats.stats);
            //     for(let i=0;i<resp.data.playerstats.stats.length; i++){
            //         switch(resp.data.playerstats.stats[i].name){
            //             case "total_kills": data.push(resp.data.playerstats.stats[i].value); break;
            //             case "total_deaths":data.push(resp.data.playerstats.stats[i].value); break;
            //             case "total_time_played": data.push(resp.data.playerstats.stats[i].value); break;
            //             case "total_matches_played": data.push(resp.data.playerstats.stats[i].value); break;
            //             case "total_wins": data.push(resp.data.playerstats.stats[i].value); break;
            //             case "total_mvps": data.push(resp.data.playerstats.stats[i].value); break;
            //             default: break;
            //         }
            //     }
            //     this.props.onSubmit(data);
            // });
            this.props.onSubmit(player);
            this.setState({steamID: ''});
        });


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
