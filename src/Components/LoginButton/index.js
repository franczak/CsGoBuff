import React from 'react';
import { backend } from '../../ENVS';

export default function LoginButton() {
  return (
    <div>
      <a href={backend}>
        <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png" alt="login sign" />
      </a>
    </div>
  );
}
