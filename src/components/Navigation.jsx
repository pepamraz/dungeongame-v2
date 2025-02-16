import React from 'react'
import NavigationItem from './NavigationItem'

const Navigation = ({ setSelectedPlace }) => {

  const handleNavigation = (place) => {
    setSelectedPlace(place)
  }

  return (
    <div className='w-full bg-gray-900 h-1/8 rounded-b-lg flex items-center px-3 gap-3'>
        <NavigationItem onClick={() => handleNavigation('cave')} title='Cave' image='/src/assets/caves/cave-1.webp'/>
        <NavigationItem onClick={() => handleNavigation('shop')} title='Shop' image='/src/assets/shop/shop.webp'/>
        <NavigationItem onClick={() => handleNavigation('profile')} title='Profile' image='/src/assets/player-avatar-head.webp'/>
    </div>
  )
}

export default Navigation