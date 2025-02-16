import React from 'react'
import Cave from './places/Cave';
import { useState } from 'react';

const Game = ({player, setPlayer}) => {

    return (
    <div className='h-7/8 rounded-t-lg'>
        <Cave player={player} setPlayer={setPlayer}/>
    </div>
  )
}

export default Game