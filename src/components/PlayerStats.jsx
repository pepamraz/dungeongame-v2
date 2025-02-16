import React from 'react'
import PlayerHead from '../assets/player-avatar-head.webp';
import EnergyIcon from '../assets/icons/energy-bolt-icon.webp';
import MoneyIcon from '../assets/icons/gold-coins-money.webp';
import HeartIcon from '../assets/icons/hp-icon.webp';

const PlayerStats = ({player}) => {
  return (
    <div id='player-stats' className='flex flex-col gap-1'>
        <img src={PlayerHead} width={100} alt='player avatar' className='rounded-lg'/>
        <p>{player.name}</p>
        <div className="player-stat flex justify-between items-center">
            <img src={MoneyIcon} width={32} className='inline'/>
            <span>${player.money.toFixed(2)}</span>
        </div>
        <div className="player-stat flex justify-between items-center">
            <img src={EnergyIcon} width={32} className='inline'/>
            <span>{player.energy}%</span>
        </div>
        <div className="player-stat flex justify-between items-center">
            <img src={HeartIcon} width={32} className='inline'/>
            <span>{player.health}%</span>
        </div>
    </div>
  )
}

export default PlayerStats