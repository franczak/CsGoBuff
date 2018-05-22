import React, { Component } from 'react';
import axios from 'axios'


export default class LoginButton extends Component {

    componentDidMount() {

    }


    showUser = () => {
        axios.get("http://localhost:5000").then((res) => {
            console.log(res)
        })
    };

    render() {
        return(
            <div>
                <a href="http://localhost:5000/authenticate" >
                    <img src={'https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png'} />
                </a>

                <div onClick={this.showUser}>
                    KUUUURWa
                </div>
            </div>

        )
    }
}