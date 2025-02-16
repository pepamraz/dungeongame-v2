import React, { useEffect } from 'react'
import Game from './Game'
import Navigation from './Navigation'
import PlayerStats from './PlayerStats'
import { useState } from 'react';

const Window = () => {
  const getInitialPlayerData = () => {
    const playerData = localStorage.getItem('playerData');
    return playerData ? JSON.parse(playerData) : {
      name: 'Player',
      health: 50,
      energy: 90,
      money: 0.5,
      energyConsumption: 5,
      diamondUpgrade: 1,
      roomCount: 0,
      roomType: 'empty',
      diamondsPickedUp: 0,
      moneyMade: 0,
      moneySpent: 0,
      zombiesKilled: 0,
    };
  }

  const [player, setPlayer] = useState(getInitialPlayerData);
  const [selectedPlace, setSelectedPlace] = useState('cave');

  useEffect(() => {
    localStorage.setItem('playerData', JSON.stringify(player));
  }, [player]);


  return (
    <div className='w-5xl h-[796px] rounded-b-lg relative'>
      <Game player={player} setPlayer={setPlayer} selectedPlace={selectedPlace} />
      <Navigation setSelectedPlace={setSelectedPlace} />
      <div className='absolute top-0 right-0 bg-gray-600 p-3 rounded-bl-lg rounded-tr-lg'>
        <PlayerStats player={player} />
      </div>
    </div>
  )
}

export default Window