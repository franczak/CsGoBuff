import React from 'react';


export default function LoginButton() {
  return (
    <div>
      <a href={process.env.backend}>
        <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_02.png" alt="login sign" />
      </a>
    </div>
  );
}
