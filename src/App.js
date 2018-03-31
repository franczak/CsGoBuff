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
                <div className="player-nickname" style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.nickname}</div>
            </div>
            <div style={{marginLeft: 10}}>
                <h4>Total kills: {props.totalKills}</h4>
                <h4>Total deaths: {props.totalDeaths}</h4>
                <h4>Total time played: {props.totalTime}</h4>
                <h4>Total matches played: {props.totalMatches}</h4>
                <h4>Total wins: {props.totalWins}</h4>
                <h4>Total MVPs: {props.totalMvps}</h4>
            </div>
        </div>

    )
};

const CardList = (props) =>{
    return(
        <div>
            {props.cards.map(card=><PlayerStatsCard key={card.steamID} {...card}/>)}
        </div>
    );
};


class App extends Component {
    state={
        cards:[]
    };

    addNewCard = (cardInfo) =>{
        this.setState(prevState => ({
            cards: prevState.cards.concat(cardInfo),
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
          <CardList cards={this.state.cards}/>
          <Container cards={this.state.cards}/>
      </div>
    );
  }
}

export default App;
