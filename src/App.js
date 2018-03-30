import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Container from './Components/Container';
import PlayerStats from "./Components/PlayerStats";

const PlayerStatsCard = (props) =>{
    return(
        <div className="player-info" style={{textAlign: 'left', margin: '1em'}}>
            <img src={props.avatar}/>
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <div className="player-nickname" style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props[0]}</div>
                <div className="player-nationality">{props.playerNationality}</div>
            </div>
            <div style={{display: 'inline-block', marginLeft: 10}}>
                <h3>Total kills: {props.totalKills}</h3>
                <h3>Total deaths: {props.totalDeaths}</h3>
                <h3>Total time played: {props.totalTimePlayed}</h3>
                <h3>Total matches played: {props.totalMatchesPlayed}</h3>
                <h3>Total wins: {props.totalWins}</h3>
                <h3>Total MVPs: {props.totalMvps}</h3>
            </div>
        </div>

    )
};

const CardList = (props) =>{
     // console.log(props);
    return(
        <div>
            {props.cards.map(card=><PlayerStatsCard key={card[0]} {...card}/>)}
        </div>
    );
};


class App extends Component {
    state={
        cards:[]
    };

    addNewCard = (cardInfo) =>{
        console.log(cardInfo);
        this.setState(prevState => ({
            cards: prevState.cards.push(cardInfo),
        }));
    };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <br/>
          <PlayerStats onSubmit={this.addNewCard}/>
          {/*<CardList cards={this.state.cards}/>*/}
          {/*<Container cards={this.state.cards}/>*/}
      </div>
    );
  }
}

export default App;
