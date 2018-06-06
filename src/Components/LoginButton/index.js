import React, { Component } from 'react';
import axios from 'axios'



const server = 'https://cs-go-buff.herokuapp.com'
//https://cs-go-buff.herokuapp.com


export default class LoginButton extends Component {

    render() {
        return(
            <div>
                <a href={server}>
                    <img src={'https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png'} />
                </a>
            </div>

        )
    }
}