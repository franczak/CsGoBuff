import React, { Component } from 'react';
import axios from 'axios'


export default class LoginButton extends Component {

    render() {
        return(
            <div>
                <a href="https://cs-go-buff.herokuapp.com/" >
                    <img src={'https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png'} />
                </a>
            </div>

        )
    }
}