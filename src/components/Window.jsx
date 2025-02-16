import React from 'react'
import Game from './Game'
import Navigation from './Navigation'
import PlayerStats from './PlayerStats'
import { useState } from 'react';

const Window = () => {
  const [player, setPlayer] = useState({
    name: 'Player',
    health: 100,
    energy: 100,
    money: 0.89
});

  return (
    <div className='w-5xl h-[796px] rounded-b-lg relative'>
        <Game player={player} setPlayer={setPlayer}/>
        <Navigation/>
        <div className='absolute top-0 right-0 bg-gray-600 p-3 rounded-bl-lg rounded-tr-lg'>
          <PlayerStats player={player}/>
        </div>
    </div>
  )
}

export default Window