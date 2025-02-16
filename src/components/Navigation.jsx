import React from 'react'
import NavigationItem from './NavigationItem'
import CaveIcon from '../assets/caves/cave-1.webp'
import ShopIcon from '../assets/shop/shop.webp'
import ProfileIcon from '../assets/player-avatar-head.webp'
import FarmIcon from '../assets/farm/farm.webp'

const Navigation = ({ setSelectedPlace }) => {

  const handleNavigation = (place) => {
    setSelectedPlace(place)
  }

  return (
    <div className='w-full bg-gray-900 h-1/8 rounded-b-lg flex items-center px-3 gap-3'>
        <NavigationItem onClick={() => handleNavigation('cave')} title='Cave' image={CaveIcon}/>
        <NavigationItem onClick={() => handleNavigation('shop')} title='Shop' image={ShopIcon}/>
        <NavigationItem onClick={() => handleNavigation('profile')} title='Profile' image={ProfileIcon}/>
        <NavigationItem onClick={() => handleNavigation('farm')} title='Farm' image={FarmIcon}/>
    </div>
  )
}

export default Navigation