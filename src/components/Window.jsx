import React from 'react'
import Game from './Game'
import Navigation from './Navigation'

const Window = () => {
  return (
    <div className='w-5xl h-[796px] bg-gray-800 rounded-b-lg'>
        <Game/>
        <Navigation/>
    </div>
  )
}

export default Window