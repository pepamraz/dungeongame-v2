import React from 'react'
import Cave from './places/Cave';
import Shop from './places/Shop';
import Profile from './places/Profile';

const Game = ({player, setPlayer, selectedPlace}) => {

    return (
    <div className='h-7/8 rounded-t-lg'>
        {selectedPlace === 'cave' && <Cave player={player} setPlayer={setPlayer}/>}
        {selectedPlace === 'shop' && <Shop player={player} setPlayer={setPlayer} />}
        {selectedPlace === 'profile' && <Profile player={player} setPlayer={setPlayer} />}
    </div>
  )
}

export default Game