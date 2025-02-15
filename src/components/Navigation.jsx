import React from 'react'
import NavigationItem from './NavigationItem'

const Navigation = () => {
  return (
    <div className='w-full bg-gray-900 h-1/8 rounded-b-lg flex items-center px-3'>
        <NavigationItem title='Home' image='home'/>
    </div>
  )
}

export default Navigation